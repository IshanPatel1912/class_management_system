# EduConnect Student App

This is the Flutter mobile application for EduConnect students. It connects students to class notifications, polls, marks, calendar events, study materials, and profile information.

## What It Does

- Student login through Firebase Authentication.
- Saves and tags OneSignal device IDs by roll number.
- Shows notifications and announcements.
- Displays active polls.
- Shows published marks.
- Displays class calendar events.
- Opens study materials and folders.
- Allows students to view and update profile details.

The login screen uses EduConnect branding through:

- `assets/branding/educonnect-mobile-logo.svg`
- `lib/widgets/educonnect_logo.dart`

The SVG file is kept as the source logo asset. The visible login logo is drawn with Flutter's native `CustomPainter`, so no extra SVG package is required.

## Requirements

- Flutter SDK
- Dart SDK
- Android Studio or a configured mobile device/emulator
- Firebase configuration files already present in the project
- OneSignal app ID configured in `lib/main.dart`

## Setup

Install Flutter dependencies:

```bash
flutter pub get
```

## Run the App

Start the app on the selected emulator or connected device:

```bash
flutter run
```

List available devices:

```bash
flutter devices
```

Run on a specific device:

```bash
flutter run -d <device-id>
```

## Build

Build an Android APK:

```bash
flutter build apk
```

Build an Android App Bundle:

```bash
flutter build appbundle
```

## Checks

Run static analysis:

```bash
flutter analyze
```

Run tests:

```bash
flutter test
```

Format Dart files:

```bash
dart format lib test
```

## Important Files

- `lib/main.dart`: Firebase setup, OneSignal setup, theme, and auth gate.
- `lib/screens/login_screen.dart`: student login screen with EduConnect logo.
- `lib/screens/home_screen.dart`: bottom navigation shell.
- `lib/screens/tabs/notification_tab.dart`: notifications.
- `lib/screens/tabs/poll_tab.dart`: polls.
- `lib/screens/tabs/marks_tab.dart`: marks.
- `lib/screens/tabs/calendar_tab.dart`: calendar and events.
- `lib/screens/tabs/materials_tab.dart`: study materials.
- `lib/screens/tabs/profile_tab.dart`: student profile.
- `lib/services/auth_service.dart`: authentication logic.
- `lib/firebase_options.dart`: Firebase platform options.

## Troubleshooting

If `flutter pub get`, `flutter analyze`, or `flutter run` appears stuck:

1. Close old terminals running Flutter commands.
2. Stop stale Dart or Flutter processes from Task Manager.
3. Reopen a fresh terminal in `student_app`.
4. Run `flutter clean`.
5. Run `flutter pub get` again.

Keep the Android package name and Firebase IDs unchanged unless you also update Firebase and OneSignal configuration.
