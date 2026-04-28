import 'package:flutter/material.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../services/auth_service.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final AuthService _authService = AuthService();
  bool _isLoading = false;

  Future<void> _setupOneSignal(String rollNumber) async {
    try {
      print('=== OneSignal Setup Starting ===');

      // Step 1: Request permission
      bool granted = await OneSignal.Notifications.requestPermission(true);
      print('Notification permission granted: $granted');

      if (!granted) {
        print('Permission denied — cannot receive notifications');
        return;
      }

      // Step 2: Wait for OneSignal to fully register
      await Future.delayed(const Duration(seconds: 3));

      // Step 3: Set External User ID (most reliable method)
      await OneSignal.login(rollNumber);
      print('OneSignal login done with: $rollNumber');

      // Step 4: Also set tag as backup
      OneSignal.User.addTagWithKey("rollNumber", rollNumber);
      print('Tag set: rollNumber = $rollNumber');

      // Step 5: Wait and verify
      await Future.delayed(const Duration(seconds: 2));
      final tags = await OneSignal.User.getTags();
      print('Current tags: $tags');

      final onesignalId = await OneSignal.User.getOnesignalId();
      print('OneSignal ID: $onesignalId');

      // Step 6: Save everything to Firestore
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
        print('Saved to Firestore successfully!');
      }

      print('=== OneSignal Setup Complete ===');
    } catch (e) {
      print('OneSignal setup error: $e');
    }
  }

  void _handleLogin() async {
    setState(() { _isLoading = true; });
    try {
      String? rollNumber = await _authService.login(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );

      if (rollNumber != null && mounted) {
        // Setup OneSignal with roll number
        await _setupOneSignal(rollNumber);

        if (mounted) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => HomeScreen(rollNumber: rollNumber),
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Login failed. Check credentials.')),
        );
      }
    }
    if (mounted) {
      setState(() { _isLoading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 48.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 80),
              const Text(
                'Student Portal',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 32),
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleLogin,
                  child: _isLoading
                      ? const CircularProgressIndicator()
                      : const Text('Login', style: TextStyle(fontSize: 18)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}