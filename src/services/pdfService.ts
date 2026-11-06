import { jsPDF } from 'jspdf';
import { Student, StudentProgress, ClassRoom, TeacherAccount } from '../types';
import { ACHIEVEMENTS_DATA, VOCABULARY_DATA } from '../data/welcomeUnitData';

export function downloadStudentAchievementsPdf(
  student: Student,
  classRoom: ClassRoom,
  teacher: TeacherAccount,
  progress: StudentProgress
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(14, 116, 144); // Cyan / Blue banner
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ENGLISH LEARNING HUB', pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text('Student Learning Achievement Portfolio', pageWidth / 2, 28, { align: 'center' });

  // Student Info Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 48, pageWidth - 28, 26, 3, 3, 'FD');

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student: ${student.fullName}`, 20, 56);
  doc.text(`Class: ${classRoom.name} (${classRoom.classCode})`, 20, 64);

  doc.setFont('helvetica', 'normal');
  doc.text(`Teacher: ${teacher.fullName}`, pageWidth - 20, 56, { align: 'right' });
  doc.text(`School: ${teacher.schoolName}`, pageWidth - 20, 64, { align: 'right' });

  // Key Metrics Badges
  const metricY = 82;
  const colWidth = (pageWidth - 28) / 3;

  // Stars
  doc.setFillColor(254, 240, 138);
  doc.roundedRect(14, metricY, colWidth - 4, 20, 2, 2, 'F');
  doc.setTextColor(133, 77, 14);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`⭐ ${progress.totalStars} Stars`, 14 + (colWidth - 4) / 2, metricY + 13, { align: 'center' });

  // Level
  doc.setFillColor(224, 231, 255);
  doc.roundedRect(14 + colWidth, metricY, colWidth - 4, 20, 2, 2, 'F');
  doc.setTextColor(67, 56, 202);
  doc.text(`Level ${progress.level} Scholar`, 14 + colWidth + (colWidth - 4) / 2, metricY + 13, { align: 'center' });

  // Trophy count
  doc.setFillColor(254, 215, 170);
  doc.roundedRect(14 + colWidth * 2, metricY, colWidth - 4, 20, 2, 2, 'F');
  doc.setTextColor(154, 52, 18);
  const trophyCount = progress.earnedAchievementIds.filter(id => {
    const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
    return ach?.category === 'trophy';
  }).length;
  doc.text(`🏆 ${trophyCount} Trophies`, 14 + colWidth * 2 + (colWidth - 4) / 2, metricY + 13, { align: 'center' });

  // Skills Breakdown
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Learning Skills Mastery', 14, 115);

  let skillY = 124;
  const skillsList = [
    { label: 'Vocabulary Recognition', val: progress.skills.vocabularyRecognition },
    { label: 'Meaning & Arabic Context', val: progress.skills.meaning },
    { label: 'Listening & Dictation', val: progress.skills.listening },
    { label: 'Spelling & Writing (No "and")', val: progress.skills.spellingWriting },
    { label: 'Speech Pronunciation', val: progress.skills.pronunciation },
    { label: 'Reading Fluency', val: progress.skills.readingFluency }
  ];

  skillsList.forEach(s => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(s.label, 14, skillY + 4);

    // Progress Bar Background
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(95, skillY, 70, 5, 2, 2, 'F');

    // Progress Fill
    if (s.val > 0) {
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(95, skillY, (s.val / 100) * 70, 5, 2, 2, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`${s.val}%`, 172, skillY + 4);
    skillY += 9;
  });

  // Earned Achievements List
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Earned Badges & Trophies', 14, 186);

  let achY = 194;
  const earnedList = ACHIEVEMENTS_DATA.filter(a => progress.earnedAchievementIds.includes(a.id));

  earnedList.slice(0, 4).forEach((ach) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(`• ${ach.title}`, 16, achY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(ach.description, 16, achY + 4);
    achY += 10;
  });

  // Strengths & Recommendations Box
  doc.setDrawColor(190, 242, 100);
  doc.setFillColor(247, 254, 231);
  doc.roundedRect(14, 240, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setTextColor(54, 83, 20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Strengths & Home Support Recommendation:', 18, 247);
  doc.setFont('helvetica', 'normal');
  const recoText = progress.skills.spellingWriting >= 80
    ? 'Excellent spelling and phonetic awareness. Encourage continued daily story reading aloud.'
    : 'Strong visual recognition. Practice written composition of numbers without "and" and month ordering at home.';
  doc.text(recoText, 18, 255);

  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Official verified portfolio issued by ${teacher.schoolName} · Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 285, { align: 'center' });

  doc.save(`Achievement_Portfolio_${student.username}.pdf`);
}

export function downloadStudentLoginCardsPdf(
  classRoom: ClassRoom,
  teacher: TeacherAccount,
  students: Student[]
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ENGLISH LEARNING HUB – STUDENT LOGIN PASSES', pageWidth / 2, 12, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Class: ${classRoom.name}  |  Class Code: ${classRoom.classCode}  |  Teacher: ${teacher.fullName}`, pageWidth / 2, 21, { align: 'center' });

  // Grid of login cards (2 columns x 4 rows per page)
  const marginX = 14;
  const marginY = 36;
  const cardWidth = (pageWidth - 36) / 2;
  const cardHeight = 52;
  const cardsPerPage = 8;

  students.forEach((s, idx) => {
    const pageIndex = idx % cardsPerPage;
    if (idx > 0 && pageIndex === 0) {
      doc.addPage();
      // Re-draw header banner on new page
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageWidth, 24, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Class: ${classRoom.name} (${classRoom.classCode})`, pageWidth / 2, 15, { align: 'center' });
    }

    const col = pageIndex % 2;
    const row = Math.floor(pageIndex / 2);
    const x = marginX + col * (cardWidth + 8);
    const y = marginY + row * (cardHeight + 8);

    // Card border
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'FD');

    // Mini header on card
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x, y, cardWidth, 11, 3, 3, 'F');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('ENGLISH LEARNING HUB · STUDENT PASS', x + 6, y + 7);

    // Student Name
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(s.fullName, x + 6, y + 19);

    // Credentials
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    doc.text('1. Class Code:', x + 6, y + 27);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(classRoom.classCode, x + 44, y + 27);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('2. Username:', x + 6, y + 35);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(s.username, x + 44, y + 35);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('3. Private PIN:', x + 6, y + 43);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text(s.pin, x + 44, y + 43);

    // Cut line dotted
    doc.setDrawColor(226, 232, 240);
    doc.line(x, y + cardHeight - 2, x + cardWidth, y + cardHeight - 2);
  });

  doc.save(`Student_Logins_${classRoom.classCode}.pdf`);
}
