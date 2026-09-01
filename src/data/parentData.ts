export interface ParentStudentData {
  id: string;
  scholarNo: string;
  rollNo: string;
  name: string;
  photoUrl: string;
  classGrade: string;
  section: string;
  fatherName: string;
  motherName: string;
  contactMobile: string;
  parentEmail: string;
  house: 'Tagore (Red)' | 'Raman (Blue)' | 'Ashoka (Green)' | 'Shivaji (Yellow)';
  busRoute: string;
  bloodGroup: string;
  dob: string;
  address: string;
  classTeacher: string;
  classTeacherPhone: string;
  attendance: {
    totalDays: number;
    attendedDays: number;
    percentage: number;
    todayStatus: 'PRESENT' | 'ABSENT' | 'LEAVE';
    todayMarkedTime: string;
    monthlyBreakdown: { month: string; present: number; total: number }[];
    recentLogs: { date: string; day: string; status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'HOLIDAY'; remarks?: string }[];
  };
  fees: {
    totalAnnualFee: number;
    paidAmount: number;
    dueAmount: number;
    nextDueOn: string;
    installments: {
      id: string;
      title: string;
      amount: number;
      dueDate: string;
      status: 'PAID' | 'DUE' | 'UPCOMING';
      paidOn?: string;
      receiptNo?: string;
      paymentMode?: string;
      transactionId?: string;
    }[];
  };
  reportCards: {
    term: string;
    session: string;
    overallPercentage: number;
    grade: string;
    rank: string;
    attendance: string;
    remarks: string;
    subjects: {
      code: string;
      name: string;
      maxMarks: number;
      theory: number;
      practical: number;
      total: number;
      grade: string;
    }[];
  }[];
  homework: {
    id: string;
    subject: string;
    title: string;
    assignedDate: string;
    dueDate: string;
    assignedBy: string;
    description: string;
    isCompleted: boolean;
  }[];
  leaveApplications: {
    id: string;
    from: string;
    to: string;
    days: number;
    type: 'Medical' | 'Family' | 'Casual' | 'Emergency';
    reason: string;
    appliedDate: string;
    status: 'APPROVED' | 'PENDING' | 'REJECTED';
    approvedBy?: string;
    remarks?: string;
  }[];
  busTracker: {
    busNo: string;
    routeNumber: string;
    routeName: string;
    driverName: string;
    driverContact: string;
    helperName: string;
    speedKmH: number;
    currentStop: string;
    nextStop: string;
    etaMinutes: number;
    status: 'ON_ROUTE' | 'AT_SCHOOL' | 'PARKED';
    stops: { name: string; scheduledTime: string; actualTime?: string; passed: boolean }[];
  };
  notices: {
    id: string;
    title: string;
    date: string;
    category: 'Exam' | 'Fee' | 'Holiday' | 'Event' | 'Academic' | 'PTM' | 'Celebration';
    content: string;
    urgent?: boolean;
  }[];
  ptmSchedule: {
    upcomingDate: string;
    timeSlot: string;
    venue: string;
    teacherName: string;
    status: 'Confirmed' | 'Pending Booking';
  };
}

export const SAMPLE_STUDENTS: ParentStudentData[] = [
  {
    id: 'STU-4219',
    scholarNo: 'SCH-4219',
    rollNo: '14',
    name: 'Aaditya Verma',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    classGrade: 'Class X',
    section: 'A',
    fatherName: 'Mr. Ramesh Verma',
    motherName: 'Mrs. Sunita Verma',
    contactMobile: '+91 98934 61015',
    parentEmail: 'ramesh.verma@example.com',
    house: 'Tagore (Red)',
    busRoute: 'Route #3 (Bari Market – Shaktinagar Campus)',
    bloodGroup: 'B+ve',
    dob: '14-Aug-2010',
    address: 'Ward No. 04, Near Gandhi Chowk, Bari, Raisen (M.P.)',
    classTeacher: 'Mr. Rajesh Mehra (PGT Physics)',
    classTeacherPhone: '+91 98934 61015',
    attendance: {
      totalDays: 142,
      attendedDays: 136,
      percentage: 95.8,
      todayStatus: 'PRESENT',
      todayMarkedTime: '08:14 AM (RFID Smart Gate)',
      monthlyBreakdown: [
        { month: 'Jul 2026', present: 24, total: 25 },
        { month: 'Aug 2026', present: 22, total: 23 },
        { month: 'Sep 2026', present: 25, total: 26 },
        { month: 'Oct 2026', present: 21, total: 22 },
        { month: 'Nov 2026', present: 23, total: 24 },
        { month: 'Dec 2026', present: 21, total: 22 }
      ],
      recentLogs: [
        { date: '31-Aug-2026', day: 'Monday', status: 'PRESENT', remarks: 'On-time RFID Scan' },
        { date: '29-Aug-2026', day: 'Saturday', status: 'PRESENT', remarks: 'Active in Science Club' },
        { date: '28-Aug-2026', day: 'Friday', status: 'PRESENT', remarks: 'On-time' },
        { date: '27-Aug-2026', day: 'Thursday', status: 'PRESENT', remarks: 'On-time' },
        { date: '26-Aug-2026', day: 'Wednesday', status: 'LEAVE', remarks: 'Medical Leave Approved' },
        { date: '25-Aug-2026', day: 'Tuesday', status: 'PRESENT', remarks: 'On-time' }
      ]
    },
    fees: {
      totalAnnualFee: 26400,
      paidAmount: 19800,
      dueAmount: 6600,
      nextDueOn: '15-Oct-2026',
      installments: [
        {
          id: 'FEE-Q1',
          title: '1st Quarter (Apr – Jun 2026)',
          amount: 6600,
          dueDate: '10-Apr-2026',
          status: 'PAID',
          paidOn: '08-Apr-2026',
          receiptNo: 'MPCS/2026/REC-1082',
          paymentMode: 'Online UPI (PhonePe)',
          transactionId: 'UPI260408119280'
        },
        {
          id: 'FEE-Q2',
          title: '2nd Quarter (Jul – Sep 2026)',
          amount: 6600,
          dueDate: '10-Jul-2026',
          status: 'PAID',
          paidOn: '05-Jul-2026',
          receiptNo: 'MPCS/2026/REC-2431',
          paymentMode: 'Online NetBanking (SBI)',
          transactionId: 'SBIN8892019482'
        },
        {
          id: 'FEE-Q3',
          title: '3rd Quarter (Oct – Dec 2026)',
          amount: 6600,
          dueDate: '15-Oct-2026',
          status: 'DUE',
          paymentMode: 'Pending'
        },
        {
          id: 'FEE-Q4',
          title: '4th Quarter (Jan – Mar 2027)',
          amount: 6600,
          dueDate: '15-Jan-2027',
          status: 'UPCOMING'
        }
      ]
    },
    reportCards: [
      {
        term: 'CBSE Mid-Term Evaluation (Term 1)',
        session: '2026–2027',
        overallPercentage: 92.4,
        grade: 'A1',
        rank: '2nd in Class X-A',
        attendance: '96.2%',
        remarks: 'Outstanding analytical skills in Science & Mathematics. Active participant in CBSE science exhibitions.',
        subjects: [
          { code: '086', name: 'Science (Physics, Chem, Bio)', maxMarks: 100, theory: 76, practical: 20, total: 96, grade: 'A1' },
          { code: '041', name: 'Mathematics (Standard)', maxMarks: 100, theory: 74, practical: 20, total: 94, grade: 'A1' },
          { code: '184', name: 'English Language & Literature', maxMarks: 100, theory: 72, practical: 20, total: 92, grade: 'A1' },
          { code: '085', name: 'Hindi Course-B', maxMarks: 100, theory: 69, practical: 20, total: 89, grade: 'A2' },
          { code: '087', name: 'Social Science (His, Geo, Civ, Eco)', maxMarks: 100, theory: 71, practical: 20, total: 91, grade: 'A1' },
          { code: '417', name: 'Artificial Intelligence / Computer IT', maxMarks: 100, theory: 48, practical: 48, total: 96, grade: 'A1' }
        ]
      }
    ],
    homework: [
      {
        id: 'HW-101',
        subject: 'Mathematics',
        title: 'NCERT Chapter 4 - Quadratic Equations Exercise 4.3',
        assignedDate: '31-Aug-2026',
        dueDate: '02-Sep-2026',
        assignedBy: 'Mr. S. K. Sharma',
        description: 'Complete problems 1 to 8 in class homework notebook with complete working steps.',
        isCompleted: false
      },
      {
        id: 'HW-102',
        subject: 'Science',
        title: 'Light - Reflection and Refraction Ray Diagrams',
        assignedDate: '30-Aug-2026',
        dueDate: '01-Sep-2026',
        assignedBy: 'Mr. Rajesh Mehra',
        description: 'Draw standard 6 ray diagrams for Concave Mirror on practical sheets with proper scale and labels.',
        isCompleted: true
      },
      {
        id: 'HW-103',
        subject: 'English',
        title: 'Analytical Paragraph on Climate Action in Raisen',
        assignedDate: '29-Aug-2026',
        dueDate: '01-Sep-2026',
        assignedBy: 'Mrs. Rekha Joshi',
        description: 'Write 120-150 words analyzing local renewable energy initiatives.',
        isCompleted: true
      }
    ],
    leaveApplications: [
      {
        id: 'LV-8812',
        from: '26-Aug-2026',
        to: '26-Aug-2026',
        days: 1,
        type: 'Medical',
        reason: 'Viral fever and doctor-prescribed rest.',
        appliedDate: '25-Aug-2026',
        status: 'APPROVED',
        approvedBy: 'Mrs. Shailja Dubey (Principal)',
        remarks: 'Granted with medical prescription.'
      }
    ],
    busTracker: {
      busNo: 'MP-38-P-1204',
      routeNumber: 'Bus Route #3',
      routeName: 'Bari Bus Stand – Barna Road – Shaktinagar Campus',
      driverName: 'Mr. Kailash Singh',
      driverContact: '+91 98934 61015',
      helperName: 'Mr. Jagdish (Attendant)',
      speedKmH: 26,
      currentStop: 'Bari Old Bus Stand',
      nextStop: 'Gandhi Chowk Stop',
      etaMinutes: 7,
      status: 'ON_ROUTE',
      stops: [
        { name: 'Barna Colony Stop', scheduledTime: '07:30 AM', actualTime: '07:32 AM', passed: true },
        { name: 'Kishanpur Phata', scheduledTime: '07:42 AM', actualTime: '07:44 AM', passed: true },
        { name: 'Bari Old Bus Stand', scheduledTime: '07:55 AM', actualTime: '07:56 AM', passed: true },
        { name: 'Gandhi Chowk Stop', scheduledTime: '08:05 AM', passed: false },
        { name: 'Shaktinagar MPCS Campus', scheduledTime: '08:15 AM', passed: false }
      ]
    },
    notices: [
      {
        id: 'NTC-501',
        title: 'CBSE Pre-Board Examination Timetable 2026',
        date: '28-Aug-2026',
        category: 'Exam',
        content: 'Pre-Board examinations for Class X & XII will commence from 15th November 2026. Detailed subject-wise syllabus is uploaded on NextERP.',
        urgent: true
      },
      {
        id: 'NTC-502',
        title: 'Parent-Teacher Meeting (PTM) for Term-1 Progress',
        date: '25-Aug-2026',
        category: 'PTM',
        content: 'Quarterly PTM is scheduled for Saturday, 12th September 2026 from 09:30 AM to 01:00 PM in the Senior Wing.',
        urgent: false
      },
      {
        id: 'NTC-503',
        title: 'Science & Robotics Olympiad Registration Open',
        date: '20-Aug-2026',
        category: 'Academic',
        content: 'Students interested in participating in the National Science Olympiad may submit their nominations to science teachers by 5th September.',
        urgent: false
      }
    ],
    ptmSchedule: {
      upcomingDate: 'Saturday, 12th Sep 2026',
      timeSlot: '10:15 AM – 10:30 AM',
      venue: 'Room No. 204 (Senior Wing, 2nd Floor)',
      teacherName: 'Mr. Rajesh Mehra (Class Teacher X-A)',
      status: 'Confirmed'
    }
  },
  {
    id: 'STU-3104',
    scholarNo: 'SCH-3104',
    rollNo: '22',
    name: 'Pooja Shrivastava',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    classGrade: 'Class VIII',
    section: 'B',
    fatherName: 'Mr. Dileep Shrivastava',
    motherName: 'Mrs. Maya Shrivastava',
    contactMobile: '+91 94254 78910',
    parentEmail: 'dileep.shri@example.com',
    house: 'Raman (Blue)',
    busRoute: 'Route #1 (Bari Town Internal)',
    bloodGroup: 'O+ve',
    dob: '05-May-2012',
    address: 'Shaktinagar Main Road, Bari, Raisen (M.P.)',
    classTeacher: 'Mrs. Anita Saxena (TGT English)',
    classTeacherPhone: '+91 98934 61015',
    attendance: {
      totalDays: 142,
      attendedDays: 139,
      percentage: 97.8,
      todayStatus: 'PRESENT',
      todayMarkedTime: '08:08 AM (Smart Turnstile)',
      monthlyBreakdown: [
        { month: 'Jul 2026', present: 25, total: 25 },
        { month: 'Aug 2026', present: 23, total: 23 },
        { month: 'Sep 2026', present: 26, total: 26 },
        { month: 'Oct 2026', present: 22, total: 22 },
        { month: 'Nov 2026', present: 24, total: 24 },
        { month: 'Dec 2026', present: 21, total: 22 }
      ],
      recentLogs: [
        { date: '31-Aug-2026', day: 'Monday', status: 'PRESENT', remarks: 'On-time' },
        { date: '29-Aug-2026', day: 'Saturday', status: 'PRESENT', remarks: 'Debate Club Lead' },
        { date: '28-Aug-2026', day: 'Friday', status: 'PRESENT', remarks: 'On-time' },
        { date: '27-Aug-2026', day: 'Thursday', status: 'PRESENT', remarks: 'On-time' },
        { date: '26-Aug-2026', day: 'Wednesday', status: 'PRESENT', remarks: 'On-time' }
      ]
    },
    fees: {
      totalAnnualFee: 21600,
      paidAmount: 21600,
      dueAmount: 0,
      nextDueOn: 'Session Cleared',
      installments: [
        {
          id: 'FEE-P8-1',
          title: 'Full Annual School Fee 2026–27',
          amount: 21600,
          dueDate: '15-Apr-2026',
          status: 'PAID',
          paidOn: '12-Apr-2026',
          receiptNo: 'MPCS/2026/REC-0419',
          paymentMode: 'Online Debit Card (HDFC)',
          transactionId: 'HDFC902819827'
        }
      ]
    },
    reportCards: [
      {
        term: 'Term 1 Summative Assessment',
        session: '2026–2027',
        overallPercentage: 94.8,
        grade: 'A1',
        rank: '1st in Class VIII-B',
        attendance: '98.5%',
        remarks: 'Exceptional fluency in English & Hindi. Outstanding artistic and oratory leadership in Raman house.',
        subjects: [
          { code: 'ENG', name: 'English Literature & Grammar', maxMarks: 100, theory: 78, practical: 20, total: 98, grade: 'A1' },
          { code: 'HIN', name: 'Hindi Vyakaran & Sahitya', maxMarks: 100, theory: 76, practical: 20, total: 96, grade: 'A1' },
          { code: 'MAT', name: 'Mathematics', maxMarks: 100, theory: 72, practical: 20, total: 92, grade: 'A1' },
          { code: 'SCI', name: 'General Science', maxMarks: 100, theory: 75, practical: 20, total: 95, grade: 'A1' },
          { code: 'SST', name: 'Social Studies', maxMarks: 100, theory: 74, practical: 20, total: 94, grade: 'A1' },
          { code: 'SAN', name: 'Sanskrit', maxMarks: 100, theory: 74, practical: 20, total: 94, grade: 'A1' }
        ]
      }
    ],
    homework: [
      {
        id: 'HW-201',
        subject: 'English',
        title: 'Poem Comprehension - The Road Not Taken',
        assignedDate: '31-Aug-2026',
        dueDate: '02-Sep-2026',
        assignedBy: 'Mrs. Anita Saxena',
        description: 'Answer contextual questions 1 to 5 and write a 50-word poetic summary.',
        isCompleted: true
      },
      {
        id: 'HW-202',
        subject: 'Science',
        title: 'Microorganisms: Friend and Foe chart preparation',
        assignedDate: '30-Aug-2026',
        dueDate: '03-Sep-2026',
        assignedBy: 'Mr. P. N. Dubey',
        description: 'Classify bacteria, fungi, algae with diagram illustrations on A4 paper.',
        isCompleted: false
      }
    ],
    leaveApplications: [],
    busTracker: {
      busNo: 'MP-38-P-0891',
      routeNumber: 'Bus Route #1',
      routeName: 'Bari Internal Town Loop',
      driverName: 'Mr. Radheshyam',
      driverContact: '+91 98934 61015',
      helperName: 'Mr. Ramu',
      speedKmH: 22,
      currentStop: 'Hospital Square',
      nextStop: 'Shaktinagar Campus Gate',
      etaMinutes: 4,
      status: 'ON_ROUTE',
      stops: [
        { name: 'Kanya Shala Stop', scheduledTime: '07:45 AM', actualTime: '07:46 AM', passed: true },
        { name: 'Hospital Square', scheduledTime: '07:58 AM', actualTime: '07:59 AM', passed: true },
        { name: 'Shaktinagar Campus Gate', scheduledTime: '08:10 AM', passed: false }
      ]
    },
    notices: [
      {
        id: 'NTC-601',
        title: 'Annual Inter-House Debate Competition',
        date: '29-Aug-2026',
        category: 'Event',
        content: 'Inter-House English & Hindi debate on 8th September. Participants to register with House Masters.',
        urgent: false
      }
    ],
    ptmSchedule: {
      upcomingDate: 'Saturday, 12th Sep 2026',
      timeSlot: '11:00 AM – 11:15 AM',
      venue: 'Middle Wing, Room 108',
      teacherName: 'Mrs. Anita Saxena',
      status: 'Confirmed'
    }
  },
  {
    id: 'STU-5821',
    scholarNo: 'SCH-5821',
    rollNo: '07',
    name: 'Aarav Patel',
    photoUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80',
    classGrade: 'Class II',
    section: 'A',
    fatherName: 'Mr. Mahendra Patel',
    motherName: 'Mrs. Geeta Patel',
    contactMobile: '+91 97521 34567',
    parentEmail: 'mahendra.patel@example.com',
    house: 'Ashoka (Green)',
    busRoute: 'Self Drop / Parent Pick-Up',
    bloodGroup: 'A+ve',
    dob: '22-Dec-2018',
    address: 'Near Old Tehsil Office, Bari, Raisen (M.P.)',
    classTeacher: 'Mrs. Kavita Tiwari (PRT Primary)',
    classTeacherPhone: '+91 98934 61015',
    attendance: {
      totalDays: 142,
      attendedDays: 133,
      percentage: 93.6,
      todayStatus: 'PRESENT',
      todayMarkedTime: '08:20 AM (Primary Wing Gate)',
      monthlyBreakdown: [
        { month: 'Jul 2026', present: 23, total: 25 },
        { month: 'Aug 2026', present: 21, total: 23 },
        { month: 'Sep 2026', present: 24, total: 26 }
      ],
      recentLogs: [
        { date: '31-Aug-2026', day: 'Monday', status: 'PRESENT', remarks: 'Cheerfully arrived' },
        { date: '29-Aug-2026', day: 'Saturday', status: 'PRESENT', remarks: 'Drawing class star' },
        { date: '28-Aug-2026', day: 'Friday', status: 'PRESENT', remarks: 'On-time' }
      ]
    },
    fees: {
      totalAnnualFee: 16800,
      paidAmount: 12600,
      dueAmount: 4200,
      nextDueOn: '15-Oct-2026',
      installments: [
        {
          id: 'FEE-P2-1',
          title: 'Term 1 Fee (Apr - Jun)',
          amount: 4200,
          dueDate: '10-Apr-2026',
          status: 'PAID',
          paidOn: '10-Apr-2026',
          receiptNo: 'MPCS/2026/REC-0129',
          paymentMode: 'UPI PhonePe'
        },
        {
          id: 'FEE-P2-2',
          title: 'Term 2 Fee (Jul - Sep)',
          amount: 4200,
          dueDate: '10-Jul-2026',
          status: 'PAID',
          paidOn: '09-Jul-2026',
          receiptNo: 'MPCS/2026/REC-1940',
          paymentMode: 'Cash at Counter'
        },
        {
          id: 'FEE-P2-3',
          title: 'Term 3 Fee (Oct - Dec)',
          amount: 4200,
          dueDate: '15-Oct-2026',
          status: 'DUE'
        },
        {
          id: 'FEE-P2-4',
          title: 'Term 4 Fee (Jan - Mar)',
          amount: 4200,
          dueDate: '15-Jan-2027',
          status: 'UPCOMING'
        }
      ]
    },
    reportCards: [
      {
        term: 'Evaluation 1 (Foundational Stage)',
        session: '2026–2027',
        overallPercentage: 91.5,
        grade: 'A+',
        rank: 'Grade A+ Achiever',
        attendance: '94.0%',
        remarks: 'Very creative and enthusiastic in phonics, drawing, and interactive smart board games.',
        subjects: [
          { code: 'ENG', name: 'English (Reading & Writing)', maxMarks: 50, theory: 45, practical: 0, total: 45, grade: 'A+' },
          { code: 'HIN', name: 'Hindi (Swar, Vyanjan & Kavita)', maxMarks: 50, theory: 46, practical: 0, total: 46, grade: 'A+' },
          { code: 'MAT', name: 'Mathematics (Numbers & Shapes)', maxMarks: 50, theory: 47, practical: 0, total: 47, grade: 'A+' },
          { code: 'EVS', name: 'Environmental Studies', maxMarks: 50, theory: 45, practical: 0, total: 45, grade: 'A+' },
          { code: 'ART', name: 'Art & Craft / Activity', maxMarks: 50, theory: 48, practical: 0, total: 48, grade: 'A+' }
        ]
      }
    ],
    homework: [
      {
        id: 'HW-01',
        subject: 'Maths',
        title: 'Tables of 4 and 5 handwriting',
        assignedDate: '31-Aug-2026',
        dueDate: '01-Sep-2026',
        assignedBy: 'Mrs. Kavita Tiwari',
        description: 'Write 4 and 5 multiplication table twice in square notebook.',
        isCompleted: true
      },
      {
        id: 'HW-02',
        subject: 'Drawing',
        title: 'Colouring National Flag on Page 12',
        assignedDate: '31-Aug-2026',
        dueDate: '02-Sep-2026',
        assignedBy: 'Mrs. Neha Sen',
        description: 'Neatly colour saffron, white, green with crayons.',
        isCompleted: false
      }
    ],
    leaveApplications: [],
    busTracker: {
      busNo: 'N/A',
      routeNumber: 'Parent Drop',
      routeName: 'Self Commute / Non-Bus',
      driverName: 'Self Escorted',
      driverContact: 'School Helpdesk: +91 98934 61015',
      helperName: 'N/A',
      speedKmH: 0,
      currentStop: 'At School Campus',
      nextStop: 'Dispersal Gate at 01:45 PM',
      etaMinutes: 0,
      status: 'AT_SCHOOL',
      stops: []
    },
    notices: [
      {
        id: 'NTC-701',
        title: 'Primary Wing Grandparents Day Celebration',
        date: '27-Aug-2026',
        category: 'Celebration',
        content: 'Special morning assembly and cultural performances by Nursery to Class II kids on 10th September.',
        urgent: false
      }
    ],
    ptmSchedule: {
      upcomingDate: 'Saturday, 12th Sep 2026',
      timeSlot: '09:45 AM – 10:00 AM',
      venue: 'Primary Wing, Room 12',
      teacherName: 'Mrs. Kavita Tiwari',
      status: 'Confirmed'
    }
  }
];
