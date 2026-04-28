import 'package:flutter/material.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../services/auth_service.dart';
import '../widgets/educonnect_logo.dart';
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

  // ✅ Save OneSignal token to Firestore
  Future<void> _saveOneSignalToken(String rollNumber) async {
    try {
      // Wait for OneSignal to fully initialize
      await Future.delayed(const Duration(seconds: 2));

      final deviceId = await OneSignal.User.getOnesignalId();
      print('OneSignal Device ID: $deviceId');

      if (deviceId != null) {
        // Save to Firestore
        await FirebaseFirestore.instance
            .collection('oneSignalTokens')
            .doc(rollNumber)
            .set({
          'playerId': deviceId,
          'rollNumber': rollNumber,
          'updatedAt': FieldValue.serverTimestamp(),
        });
        print('OneSignal token saved to Firestore for: $rollNumber');
      } else {
        print('OneSignal Device ID is null — permission may be denied');
      }
    } catch (e) {
      print('OneSignal token save error: $e');
    }
  }

  // ✅ Set roll number as tag in OneSignal
  Future<void> _setOneSignalTag(String rollNumber) async {
    try {
      // Wait for device to be fully registered
      await Future.delayed(const Duration(seconds: 3));

      OneSignal.User.addTagWithKey("rollNumber", rollNumber);
      print('OneSignal tag set: rollNumber = $rollNumber');

      // Verify tags were set
      final tags = await OneSignal.User.getTags();
      print('OneSignal tags after setting: $tags');
    } catch (e) {
      print('OneSignal tag error: $e');
    }
  }

  void _handleLogin() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String? rollNumber = await _authService.login(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );

      if (rollNumber != null && mounted) {
        // ✅ Request notification permission first
        await OneSignal.Notifications.requestPermission(true);

        // ✅ Save token and set tag
        await _saveOneSignalToken(rollNumber);
        await _setOneSignalTag(rollNumber);

        // ✅ Navigate to home
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
      setState(() {
        _isLoading = false;
      });
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
              const SizedBox(height: 48),
              const EduConnectLogo(size: 118),
              const SizedBox(height: 42),
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
