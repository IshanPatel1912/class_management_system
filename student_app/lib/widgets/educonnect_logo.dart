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
        CustomPaint(
          size: Size.square(size),
          painter: const _EduConnectMarkPainter(),
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

class _EduConnectMarkPainter extends CustomPainter {
  const _EduConnectMarkPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 320;
    canvas.scale(scale);

    final backgroundPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFFEFF6FF), Color(0xFFCCFBF1)],
    ).createShader(const Rect.fromLTWH(0, 0, 320, 320));
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(0, 0, 320, 320),
        const Radius.circular(74),
      ),
      backgroundPaint,
    );

    canvas.drawShadow(
      Path()
        ..addRRect(
          RRect.fromRectAndRadius(
            const Rect.fromLTWH(52, 52, 216, 216),
            const Radius.circular(56),
          ),
        ),
      const Color(0xFF0F172A),
      18,
      true,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(52, 52, 216, 216),
        const Radius.circular(56),
      ),
      Paint()..color = Colors.white,
    );

    final bookPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFF2563EB), Color(0xFF14B8A6)],
      ).createShader(const Rect.fromLTWH(76, 110, 174, 143));
    final bookPath = Path()
      ..moveTo(76, 128)
      ..cubicTo(76, 118.1, 84.1, 110, 94, 110)
      ..lineTo(132, 110)
      ..cubicTo(147.1, 110, 157.8, 114.8, 163, 122)
      ..cubicTo(168.2, 114.8, 178.9, 110, 194, 110)
      ..lineTo(232, 110)
      ..cubicTo(241.9, 110, 250, 118.1, 250, 128)
      ..lineTo(250, 235)
      ..cubicTo(250, 239.4, 246.4, 243, 242, 243)
      ..lineTo(194, 243)
      ..cubicTo(178.8, 243, 168.5, 246.4, 163, 252.8)
      ..cubicTo(157.5, 246.4, 147.2, 243, 132, 243)
      ..lineTo(84, 243)
      ..cubicTo(79.6, 243, 76, 239.4, 76, 235)
      ..close();
    canvas.drawPath(bookPath, bookPaint);

    canvas.drawPath(
      Path()
        ..moveTo(101, 140)
        ..lineTo(131.5, 140)
        ..cubicTo(141.3, 140, 148.2, 142.6, 152, 147.6)
        ..lineTo(152, 223)
        ..cubicTo(146.8, 220.1, 139.4, 218.6, 130, 218.6)
        ..lineTo(101, 218.6)
        ..close()
        ..moveTo(189, 140)
        ..lineTo(219.5, 140)
        ..lineTo(219.5, 218.6)
        ..lineTo(190.5, 218.6)
        ..cubicTo(181.1, 218.6, 173.7, 220.1, 168.5, 223)
        ..lineTo(168.5, 147.6)
        ..cubicTo(172.3, 142.6, 179.2, 140, 189, 140)
        ..close(),
      Paint()..color = Colors.white,
    );

    final capPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFF0F172A), Color(0xFF334155)],
      ).createShader(const Rect.fromLTWH(91, 72, 144, 66));
    canvas.drawPath(
      Path()
        ..moveTo(163, 72)
        ..lineTo(235, 105)
        ..lineTo(163, 138)
        ..lineTo(91, 105)
        ..close(),
      capPaint,
    );

    final linePaint = Paint()
      ..color = const Color(0xFF2563EB)
      ..strokeWidth = 9
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(const Offset(119, 170), const Offset(142, 170), linePaint);
    canvas.drawLine(const Offset(119, 195), const Offset(142, 195), linePaint);
    canvas.drawLine(const Offset(184, 170), const Offset(207, 170), linePaint);
    canvas.drawLine(const Offset(184, 195), const Offset(207, 195), linePaint);

    final tasselPaint = Paint()
      ..color = const Color(0xFF0F172A)
      ..strokeWidth = 9
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(
      const Offset(219, 115),
      const Offset(219, 152),
      tasselPaint,
    );
    canvas.drawCircle(
      const Offset(219, 164),
      11,
      Paint()..color = const Color(0xFF14B8A6),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
