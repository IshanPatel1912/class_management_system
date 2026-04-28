import 'package:flutter/material.dart';

class EduConnectLogo extends StatelessWidget {
  const EduConnectLogo({
    super.key,
    this.size = 104,
    this.showWordmark = true,
  });

  final double size;
  final bool showWordmark;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(size * 0.23),
          child: Image.asset(
            'assets/branding/educonnect-app-icon.png',
            width: size,
            height: size,
            fit: BoxFit.cover,
          ),
        ),
        if (showWordmark) ...[
          const SizedBox(height: 18),
          Text(
            'EduConnect',
            textAlign: TextAlign.center,
            style: theme.textTheme.headlineMedium?.copyWith(
              color: const Color(0xFF0F766E),
              fontWeight: FontWeight.w800,
              letterSpacing: 0,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'STUDENT PORTAL',
            textAlign: TextAlign.center,
            style: theme.textTheme.labelMedium?.copyWith(
              color: const Color(0xFF64748B),
              fontWeight: FontWeight.w700,
              letterSpacing: 1.7,
            ),
          ),
        ],
      ],
    );
  }
}
