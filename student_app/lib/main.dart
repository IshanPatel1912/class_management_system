import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';
import 'firebase_options.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // ✅ Fixed: added options parameter
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // ✅ OneSignal initialize only — don't request permission here
  OneSignal.initialize("308f3e64-aa90-464a-8609-caafabfb60ba");

  runApp(const StudentApp());
}

class StudentApp extends StatelessWidget {
  const StudentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  Future<String?> _getRollNumber(String uid) async {
    try {
      final doc = await FirebaseFirestore.instance
          .collection('users')
          .doc(uid)
          .get();
      if (doc.exists) {
        final data = doc.data();
        if (data != null && data.containsKey('rollNumber')) {
          return data['rollNumber'];
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // ✅ NEW: Setup OneSignal for already logged in users
  Future<void> _setupOneSignalForExistingUser(String rollNumber) async {
    try {
      print('=== Setting up OneSignal for existing user: $rollNumber ===');

      // Request permission
      bool granted = await OneSignal.Notifications.requestPermission(true);
      print('Permission granted: $granted');

      if (!granted) return;

      await Future.delayed(const Duration(seconds: 2));

      // Login with roll number as external ID
      await OneSignal.login(rollNumber);
      print('OneSignal login done: $rollNumber');

      // Set tag
      OneSignal.User.addTagWithKey("rollNumber", rollNumber);
      print('Tag set for: $rollNumber');

      await Future.delayed(const Duration(seconds: 2));

      // Get and save device ID
      final onesignalId = await OneSignal.User.getOnesignalId();
      print('OneSignal ID: $onesignalId');

      if (onesignalId != null) {
        await FirebaseFirestore.instance
            .collection('oneSignalTokens')
            .doc(rollNumber)
            .set({
          'playerId': onesignalId,
          'externalId': rollNumber,
          'rollNumber': rollNumber,
          'updatedAt': FieldValue.serverTimestamp(),
        });
        print('✅ Saved to Firestore!');
      }

      // Verify tags
      final tags = await OneSignal.User.getTags();
      print('Final tags: $tags');

    } catch (e) {
      print('OneSignal existing user setup error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (snapshot.hasData && snapshot.data != null) {
          return FutureBuilder<String?>(
            future: _getRollNumber(snapshot.data!.uid),
            builder: (context, rollSnapshot) {
              if (rollSnapshot.connectionState == ConnectionState.waiting) {
                return const Scaffold(
                  body: Center(child: CircularProgressIndicator()),
                );
              }
              if (rollSnapshot.hasData && rollSnapshot.data != null) {
                // ✅ NEW: Setup OneSignal every time app opens
                _setupOneSignalForExistingUser(rollSnapshot.data!);
                return HomeScreen(rollNumber: rollSnapshot.data!);
              }
              return const LoginScreen();
            },
          );
        }

        return const LoginScreen();
      },
    );
  }
}