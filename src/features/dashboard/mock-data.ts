export const personalDashboardMock = {
  cards: [
    { title: "Total Penelitian", value: "18", trend: "+3 dari tahun lalu" },
    { title: "Penelitian Aktif", value: "6", trend: "2 proposal baru minggu ini" },
    { title: "Publikasi", value: "42", trend: "+8 publikasi terindeks" },
    { title: "Sitasi", value: "136", trend: "+24 sitasi" },
    { title: "H-Index", value: "14", trend: "Target naik 2 poin" }
  ],
  publicationByYear: [
    { year: 2022, value: 4 },
    { year: 2023, value: 7 },
    { year: 2024, value: 9 },
    { year: 2025, value: 12 },
    { year: 2026, value: 10 }
  ],
  citationByYear: [
    { year: 2022, value: 32 },
    { year: 2023, value: 48 },
    { year: 2024, value: 71 },
    { year: 2025, value: 106 },
    { year: 2026, value: 136 }
  ],
  researchStatus: [
    { name: "Draft", value: 4 },
    { name: "Submitted", value: 3 },
    { name: "Under Review", value: 2 },
    { name: "Approved", value: 6 },
    { name: "Completed", value: 3 }
  ]
};

export const lppmDashboardMock = {
  cards: [
    { title: "Proposal Masuk", value: "34", trend: "8 menunggu verifikasi" },
    { title: "Sedang Direview", value: "12", trend: "5 reviewer aktif" },
    { title: "Disetujui", value: "19", trend: "+4 proposal minggu ini" },
    { title: "Ditolak", value: "3", trend: "Perlu follow-up" },
    { title: "Dana Penelitian", value: "Rp 1.240.000.000", trend: "Plafon terserap 67%" }
  ]
};

export const kaprodiDashboardMock = {
  totalDosen: 28,
  totalResearch: 46,
  totalPublication: 121,
  totalHki: 11
};

export const researchRows = [
  { title: "AI untuk Monitoring Luaran", year: 2026, status: "UNDER_REVIEW", progress: 42, leader: "Dosen Peneliti" },
  { title: "Sistem Repository Publikasi", year: 2025, status: "APPROVED", progress: 78, leader: "Dosen A" },
  { title: "Analitik Kinerja Dosen", year: 2024, status: "COMPLETED", progress: 100, leader: "Dosen B" }
];

export const publicationRows = [
  { title: "ResearchHub Campus: Centralized Research Management Platform", category: "SCOPUS", year: 2026, citations: 12, journal: "Journal of Campus Digital Innovation" },
  { title: "Digital Governance for Academic Research", category: "JURNAL_INTERNASIONAL", year: 2025, citations: 8, journal: "International Journal of Higher Education Systems" },
  { title: "Open Repository Architecture", category: "PROSIDING", year: 2024, citations: 4, journal: "Proceedings of Education Tech" }
];

export const reviewRows = [
  { research: "AI untuk Monitoring Luaran", reviewer: "Reviewer Satu", score: 87.5, recommendation: "APPROVED" },
  { research: "Sistem Repository Publikasi", reviewer: "Reviewer Dua", score: 78.0, recommendation: "REVISION" },
  { research: "Analitik Kinerja Dosen", reviewer: "Reviewer Tiga", score: 61.0, recommendation: "REJECTED" }
];

export const notificationRows = [
  { title: "Proposal disetujui", message: "Proposal Anda disetujui dan masuk ke tahap implementasi." },
  { title: "Reviewer assignment", message: "Anda ditunjuk sebagai reviewer proposal baru." },
  { title: "Deadline laporan", message: "Laporan kemajuan jatuh tempo dalam 5 hari." }
];
