# EduConnect

EduConnect is a class management system with two connected applications:

- `admin-panel`: a React + Vite web dashboard for administrators and teachers.
- `student_app`: a Flutter mobile application for students.

The system uses Firebase for authentication, Firestore data, messaging-related configuration, and Cloud Functions. OneSignal is used in the Flutter app for student push notification targeting.

## Features

### Admin Panel

- Manage students and import student data from Excel or CSV.
- Send notifications and publish announcements.
- Create polls and view poll results.
- Publish marks.
- Manage calendar events.
- Organize study materials.
- Uses the EduConnect SVG logo and favicon from `admin-panel/public`.

### Student App

- Student login with Firebase Authentication.
- Receive notifications through OneSignal.
- View alerts, polls, marks, calendar events, materials, and profile details.
- Uses matching EduConnect branding and mobile logo assets.

## Project Structure

```text
class_management_system/
  admin-panel/        React admin dashboard
  student_app/        Flutter student mobile app
```

## Prerequisites

Install these before running the project:

- Node.js and npm for the admin panel.
- Flutter SDK and Dart for the student app.
- Android Studio or another Android emulator/device setup for mobile testing.
- Firebase project configuration files already included in the app folders.

## Run the Admin Panel

```bash
cd admin-panel
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173/
```

Build for production:

```bash
npm run build
```

## Run the Student App

```bash
cd student_app
flutter pub get
flutter run
```

To run on a specific device:

```bash
flutter devices
flutter run -d <device-id>
```

Build an Android APK:

```bash
flutter build apk
```

## Branding Assets

Admin panel:

- `admin-panel/public/educonnect-logo.svg`
- `admin-panel/public/favicon.svg`

Student app:

- `student_app/assets/branding/educonnect-mobile-logo.svg`
- `student_app/lib/widgets/educonnect_logo.dart`

The Flutter app keeps the SVG source asset, and the login screen renders a matching native Flutter logo so the UI works without adding an extra SVG rendering package.

## Notes

- Keep Firebase package names and IDs unchanged unless you also update the Firebase project configuration.
- If Flutter commands appear stuck, stop any stale Dart processes and retry from a fresh terminal.
- Run `npm run build` for the admin panel and `flutter analyze` for the student app before final release.
