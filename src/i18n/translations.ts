export const translations = {
  de: {
    // App
    appTitle: 'Strahlblick',
    appSubtitle: 'HF-Feldstärke & Sicherheitsabstands-Rechner',
    appDescription: 'Berechnung der elektromagnetischen Feldexposition und Sicherheitsabstände nach ICNIRP-Richtlinien',

    // Theme
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus',
    toggleTheme: 'Design umschalten',

    // Language
    language: 'Sprache',
    german: 'Deutsch',
    english: 'English',

    // Input Labels
    transmitPower: 'Sendeleistung',
    transmitPowerUnit: 'Watt',
    dutyCycle: 'Tastverhältnis',
    dutyCycleDescription: 'Durchschnittlicher Anteil der Sendezeit',
    frequency: 'Frequenz',
    frequencyUnit: 'MHz',
    antennaGain: 'Antennengewinn',
    antennaGainUnit: 'dBi',
    feedlineLoss: 'Kabelverlust',
    feedlineLossUnit: 'dB',
    antennaHeight: 'Antennenhöhe',
    antennaHeightUnit: 'm',
    evaluationDistance: 'Bewertungsabstand',
    evaluationDistanceUnit: 'm',
    evaluationDistanceDescription: 'Abstand für spezifische Berechnung',

    // Presets
    presets: 'Voreinstellungen',
    powerPresets: 'Leistungs-Voreinstellungen',
    antennaPresets: 'Antennen-Voreinstellungen',
    modePresets: 'Betriebsarten',
    scenarioPresets: 'Szenarien',
    selectPreset: 'Voreinstellung wählen',
    customValue: 'Eigener Wert',

    // Antenna Types
    antennaDipole: 'Dipol',
    antennaVertical: 'Vertikalantenne',
    antennaYagi3: 'Yagi 3-Element',
    antennaYagi5: 'Yagi 5-Element',
    antennaYagi7: 'Yagi 7-Element',
    antennaQuad: 'Quad-Antenne',
    antennaLoop: 'Magnetische Loop',
    antennaGP: 'Ground Plane',
    antennaEndFed: 'End-Fed Antenne',
    antennaBeam: 'Beam-Antenne',

    // Operating Modes
    modeCW: 'CW (Telegrafie)',
    modeSSB: 'SSB (Sprache)',
    modeFM: 'FM',
    modeAM: 'AM',
    modeFT8: 'FT8',
    modeFT4: 'FT4',
    modeRTTY: 'RTTY',
    modePSK: 'PSK31',
    modeSSTV: 'SSTV',
    modeDigital: 'Digital (allg.)',

    // Scenarios
    scenarioQRP: 'QRP Portabel',
    scenarioQRPDesc: 'Geringe Leistung für Outdoor-Betrieb',
    scenarioHomeHF: 'Heimstation HF',
    scenarioHomeHFDesc: 'Typische HF-Heimstation',
    scenarioContest: 'Contest-Station',
    scenarioContestDesc: 'Hohe Leistung für Wettbewerbe',
    scenarioVHFMobile: 'VHF Mobilbetrieb',
    scenarioVHFMobileDesc: 'Mobiler 2m-Betrieb',
    scenarioUHFHandheld: 'UHF Handfunkgerät',
    scenarioUHFHandheldDesc: '70cm Handfunkgerät',
    scenarioEME: 'EME-Station',
    scenarioEMEDesc: 'Erde-Mond-Erde Betrieb',

    // Results
    results: 'Ergebnisse',
    eirp: 'EIRP (Effektive isotrope Strahlungsleistung)',
    eirpWatts: 'EIRP in Watt',
    eirpDbw: 'EIRP in dBW',
    averagePower: 'Mittlere Leistung',
    safetyDistance: 'Sicherheitsabstand',
    safetyDistancePublic: 'Allgemeine Bevölkerung',
    safetyDistanceOccupational: 'Berufliche Exposition',
    powerDensity: 'Leistungsdichte',
    powerDensityAt: 'Leistungsdichte bei',
    icnirpLimit: 'ICNIRP-Grenzwert',
    complianceRatio: 'Ausschöpfungsgrad',
    compliance: 'Einhaltung',
    compliant: 'Konform',
    notCompliant: 'Nicht konform',
    warning: 'Warnung',

    // Categories
    generalPublic: 'Allgemeine Bevölkerung',
    occupational: 'Berufliche Exposition',

    // Near Field
    nearField: 'Nahfeld',
    farField: 'Fernfeld',
    nearFieldBoundary: 'Nahfeldgrenze',
    nearFieldWarning: 'Bewertungsabstand liegt im Nahfeld - Berechnungen sind Näherungen',
    wavelength: 'Wellenlänge',

    // Multi-Band
    multiBand: 'Mehrband-Analyse',
    addBand: 'Band hinzufügen',
    removeBand: 'Band entfernen',
    totalExposure: 'Gesamtexposition',
    cumulativeRatio: 'Kumulatives Verhältnis',
    band: 'Band',

    // Distance Table
    distanceTable: 'Abstandstabelle',
    distance: 'Abstand',
    atDistance: 'bei',

    // Visualizations
    safetyZones: 'Sicherheitszonen',
    powerDensityChart: 'Leistungsdichtediagramm',
    distanceVsPowerDensity: 'Abstand vs. Leistungsdichte',

    // Educational Content
    education: 'Informationen',
    whatIsEirp: 'Was ist EIRP?',
    whatIsEirpContent: 'EIRP (Effective Isotropic Radiated Power) ist die äquivalente Strahlungsleistung, die ein isotroper Strahler benötigen würde, um dieselbe Feldstärke in der Hauptstrahlrichtung zu erzeugen. Sie berücksichtigt den Antennengewinn und Kabelverluste.',
    nearVsFarField: 'Nahfeld vs. Fernfeld',
    nearVsFarFieldContent: 'Im Nahfeld (Entfernung < 2D²/λ) sind die elektrischen und magnetischen Felder nicht proportional und die Berechnungen sind komplexer. Im Fernfeld gelten die einfachen Formeln für die Leistungsdichte.',
    icnirpGuidelines: 'ICNIRP-Richtlinien',
    icnirpGuidelinesContent: 'Die ICNIRP (International Commission on Non-Ionizing Radiation Protection) veröffentlicht Richtlinien für die Exposition gegenüber elektromagnetischen Feldern. Die Grenzwerte schützen vor nachgewiesenen Gesundheitseffekten.',
    dutyCycleImportance: 'Bedeutung des Tastverhältnisses',
    dutyCycleImportanceContent: 'Das Tastverhältnis berücksichtigt, dass bei vielen Betriebsarten nicht kontinuierlich gesendet wird. Bei SSB wird typischerweise nur 20% der Zeit tatsächlich Leistung abgestrahlt, bei CW etwa 40%.',
    safetyMeasures: 'Sicherheitsmaßnahmen',
    safetyMeasuresContent: 'Halten Sie ausreichend Abstand zu Antennen während des Sendens. Begrenzen Sie die Sendezeit. Verwenden Sie niedrigere Leistung wenn möglich. Richten Sie Antennen von Aufenthaltsbereichen weg.',

    // Formulas
    formulas: 'Formeln',
    formulaEirp: 'EIRP = P_TX × 10^((G - L) / 10)',
    formulaPowerDensity: 'S = EIRP / (4 × π × d²)',
    formulaSafetyDistance: 'd = √(EIRP / (4 × π × S_limit))',

    // PDF Export
    exportPdf: 'PDF exportieren',
    exportPdfTitle: 'HF-Expositionsbericht',
    exportPdfGenerated: 'Generiert am',
    exportPdfParameters: 'Parameter',
    exportPdfResults: 'Ergebnisse',
    exportPdfDisclaimer: 'Dieser Bericht dient nur zur Information. Für offizielle Nachweise konsultieren Sie bitte die zuständigen Behörden.',

    // Footer
    disclaimer: 'Haftungsausschluss',
    disclaimerText: 'Dieser Rechner dient nur zu Informationszwecken. Die Berechnungen basieren auf vereinfachten Modellen und Fernfeldnäherungen. Für kritische Anwendungen oder behördliche Nachweise wenden Sie sich an qualifizierte Fachleute.',
    basedOn: 'Basierend auf',
    icnirpReference: 'ICNIRP-Richtlinien 2020',

    // Misc
    reset: 'Zurücksetzen',
    calculate: 'Berechnen',
    close: 'Schließen',
    expand: 'Erweitern',
    collapse: 'Einklappen',
    meters: 'Meter',
    watts: 'Watt',

    // Footer links
    footerText: 'Strahlblick • HF-Sicherheitsrechner',
    imprint: 'Impressum',
    privacy: 'Datenschutz',

    // Imprint Modal
    imprintTitle: 'Impressum',
    imprintInfo: 'Angaben gemäß § 5 ECG und § 25 MedienG',
    imprintOperator: 'Betreiber',
    imprintOperatorName: 'Michael Linder',
    imprintOperatorCallsign: 'OE8YML',
    imprintOperatorAddress: 'Nötsch 219, 9611 Nötsch',
    imprintOperatorCountry: 'Österreich',
    imprintContact: 'Kontakt',
    imprintContactEmail: 'oe8yml@rednil.at',
    imprintLiabilityTitle: 'Haftung für Inhalte',
    imprintLiabilityText: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Dieser Rechner dient der Berechnung von HF-Sicherheitsabständen nach ICNIRP-Richtlinien.',
    imprintCopyrightTitle: 'Urheberrecht',
    imprintCopyrightText: 'Die durch den Betreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht. Der Quellcode ist unter der MIT-Lizenz auf GitHub verfügbar.',

    // Privacy Modal
    privacyTitle: 'Datenschutzerklärung',
    privacyIntro: 'Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Datenverarbeitung auf dieser Website.',
    privacyNoDataTitle: 'Keine Datenerhebung',
    privacyNoDataText: 'Diese Website ist ein reines Client-Side-Tool und erhebt, speichert oder verarbeitet keine personenbezogenen Daten. Es gibt:',
    privacyNoDataList: 'Keine Formulare oder Benutzereingaben, keine Cookies (außer der Spracheinstellung im localStorage), kein Tracking oder Analytics, keine serverseitige Datenverarbeitung.',
    privacyLocalStorageTitle: 'Lokale Speicherung',
    privacyLocalStorageText: 'Die einzige gespeicherte Information ist Ihre Sprachpräferenz und Theme-Einstellung, die lokal in Ihrem Browser gespeichert wird. Diese Daten werden nicht an Server übertragen.',
    privacyCloudflareTitle: 'Cloudflare',
    privacyCloudflareText: 'Diese Website wird über Cloudflare bereitgestellt. Cloudflare kann technisch notwendige Verbindungsdaten verarbeiten.',
    privacyContactTitle: 'Kontakt',
    privacyContactText: 'Bei Fragen können Sie uns kontaktieren:',
  },

  en: {
    // App
    appTitle: 'Strahlblick',
    appSubtitle: 'RF Exposure & Safety Distance Calculator',
    appDescription: 'Calculate electromagnetic field exposure and safety distances according to ICNIRP guidelines',

    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    toggleTheme: 'Toggle theme',

    // Language
    language: 'Language',
    german: 'Deutsch',
    english: 'English',

    // Input Labels
    transmitPower: 'Transmit Power',
    transmitPowerUnit: 'Watts',
    dutyCycle: 'Duty Cycle',
    dutyCycleDescription: 'Average proportion of transmit time',
    frequency: 'Frequency',
    frequencyUnit: 'MHz',
    antennaGain: 'Antenna Gain',
    antennaGainUnit: 'dBi',
    feedlineLoss: 'Feedline Loss',
    feedlineLossUnit: 'dB',
    antennaHeight: 'Antenna Height',
    antennaHeightUnit: 'm',
    evaluationDistance: 'Evaluation Distance',
    evaluationDistanceUnit: 'm',
    evaluationDistanceDescription: 'Distance for specific calculation',

    // Presets
    presets: 'Presets',
    powerPresets: 'Power Presets',
    antennaPresets: 'Antenna Presets',
    modePresets: 'Operating Modes',
    scenarioPresets: 'Scenarios',
    selectPreset: 'Select preset',
    customValue: 'Custom value',

    // Antenna Types
    antennaDipole: 'Dipole',
    antennaVertical: 'Vertical',
    antennaYagi3: 'Yagi 3-Element',
    antennaYagi5: 'Yagi 5-Element',
    antennaYagi7: 'Yagi 7-Element',
    antennaQuad: 'Quad Antenna',
    antennaLoop: 'Magnetic Loop',
    antennaGP: 'Ground Plane',
    antennaEndFed: 'End-Fed Antenna',
    antennaBeam: 'Beam Antenna',

    // Operating Modes
    modeCW: 'CW (Morse)',
    modeSSB: 'SSB (Voice)',
    modeFM: 'FM',
    modeAM: 'AM',
    modeFT8: 'FT8',
    modeFT4: 'FT4',
    modeRTTY: 'RTTY',
    modePSK: 'PSK31',
    modeSSTV: 'SSTV',
    modeDigital: 'Digital (general)',

    // Scenarios
    scenarioQRP: 'QRP Portable',
    scenarioQRPDesc: 'Low power for outdoor operation',
    scenarioHomeHF: 'Home Station HF',
    scenarioHomeHFDesc: 'Typical HF home station',
    scenarioContest: 'Contest Station',
    scenarioContestDesc: 'High power for competitions',
    scenarioVHFMobile: 'VHF Mobile',
    scenarioVHFMobileDesc: 'Mobile 2m operation',
    scenarioUHFHandheld: 'UHF Handheld',
    scenarioUHFHandheldDesc: '70cm handheld radio',
    scenarioEME: 'EME Station',
    scenarioEMEDesc: 'Earth-Moon-Earth operation',

    // Results
    results: 'Results',
    eirp: 'EIRP (Effective Isotropic Radiated Power)',
    eirpWatts: 'EIRP in Watts',
    eirpDbw: 'EIRP in dBW',
    averagePower: 'Average Power',
    safetyDistance: 'Safety Distance',
    safetyDistancePublic: 'General Public',
    safetyDistanceOccupational: 'Occupational Exposure',
    powerDensity: 'Power Density',
    powerDensityAt: 'Power Density at',
    icnirpLimit: 'ICNIRP Limit',
    complianceRatio: 'Compliance Ratio',
    compliance: 'Compliance',
    compliant: 'Compliant',
    notCompliant: 'Not Compliant',
    warning: 'Warning',

    // Categories
    generalPublic: 'General Public',
    occupational: 'Occupational',

    // Near Field
    nearField: 'Near Field',
    farField: 'Far Field',
    nearFieldBoundary: 'Near Field Boundary',
    nearFieldWarning: 'Evaluation distance is in near field - calculations are approximations',
    wavelength: 'Wavelength',

    // Multi-Band
    multiBand: 'Multi-Band Analysis',
    addBand: 'Add Band',
    removeBand: 'Remove Band',
    totalExposure: 'Total Exposure',
    cumulativeRatio: 'Cumulative Ratio',
    band: 'Band',

    // Distance Table
    distanceTable: 'Distance Table',
    distance: 'Distance',
    atDistance: 'at',

    // Visualizations
    safetyZones: 'Safety Zones',
    powerDensityChart: 'Power Density Chart',
    distanceVsPowerDensity: 'Distance vs. Power Density',

    // Educational Content
    education: 'Information',
    whatIsEirp: 'What is EIRP?',
    whatIsEirpContent: 'EIRP (Effective Isotropic Radiated Power) is the equivalent radiated power that an isotropic radiator would need to produce the same field strength in the main beam direction. It accounts for antenna gain and feedline losses.',
    nearVsFarField: 'Near Field vs. Far Field',
    nearVsFarFieldContent: 'In the near field (distance < 2D²/λ), the electric and magnetic fields are not proportional and calculations are more complex. In the far field, simple power density formulas apply.',
    icnirpGuidelines: 'ICNIRP Guidelines',
    icnirpGuidelinesContent: 'The ICNIRP (International Commission on Non-Ionizing Radiation Protection) publishes guidelines for electromagnetic field exposure. The limits protect against established health effects.',
    dutyCycleImportance: 'Importance of Duty Cycle',
    dutyCycleImportanceContent: 'The duty cycle accounts for the fact that many operating modes do not transmit continuously. SSB typically transmits only 20% of the time, CW about 40%.',
    safetyMeasures: 'Safety Measures',
    safetyMeasuresContent: 'Maintain adequate distance from antennas during transmission. Limit transmit time. Use lower power when possible. Direct antennas away from occupied areas.',

    // Formulas
    formulas: 'Formulas',
    formulaEirp: 'EIRP = P_TX × 10^((G - L) / 10)',
    formulaPowerDensity: 'S = EIRP / (4 × π × d²)',
    formulaSafetyDistance: 'd = √(EIRP / (4 × π × S_limit))',

    // PDF Export
    exportPdf: 'Export PDF',
    exportPdfTitle: 'RF Exposure Report',
    exportPdfGenerated: 'Generated on',
    exportPdfParameters: 'Parameters',
    exportPdfResults: 'Results',
    exportPdfDisclaimer: 'This report is for informational purposes only. For official documentation, please consult the relevant authorities.',

    // Footer
    disclaimer: 'Disclaimer',
    disclaimerText: 'This calculator is for informational purposes only. Calculations are based on simplified models and far-field approximations. For critical applications or regulatory compliance, consult qualified professionals.',
    basedOn: 'Based on',
    icnirpReference: 'ICNIRP Guidelines 2020',

    // Misc
    reset: 'Reset',
    calculate: 'Calculate',
    close: 'Close',
    expand: 'Expand',
    collapse: 'Collapse',
    meters: 'meters',
    watts: 'watts',

    // Footer links
    footerText: 'Strahlblick • RF Safety Calculator',
    imprint: 'Imprint',
    privacy: 'Privacy',

    // Imprint Modal
    imprintTitle: 'Imprint',
    imprintInfo: 'Information according to Austrian law (§ 5 ECG and § 25 MedienG)',
    imprintOperator: 'Operator',
    imprintOperatorName: 'Michael Linder',
    imprintOperatorCallsign: 'OE8YML',
    imprintOperatorAddress: 'Nötsch 219, 9611 Nötsch',
    imprintOperatorCountry: 'Austria',
    imprintContact: 'Contact',
    imprintContactEmail: 'oe8yml@rednil.at',
    imprintLiabilityTitle: 'Liability for Content',
    imprintLiabilityText: 'The contents of this website have been created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. This calculator is for calculating RF safety distances according to ICNIRP guidelines.',
    imprintCopyrightTitle: 'Copyright',
    imprintCopyrightText: 'The content and works created by the operator on this website are subject to Austrian copyright law. The source code is available under the MIT license on GitHub.',

    // Privacy Modal
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'Protecting your personal data is important to us. This privacy policy informs you about data processing on this website.',
    privacyNoDataTitle: 'No Data Collection',
    privacyNoDataText: 'This website is a pure client-side tool and does not collect, store, or process any personal data. There are:',
    privacyNoDataList: 'No forms or user inputs, no cookies (except language preference in localStorage), no tracking or analytics, no server-side data processing.',
    privacyLocalStorageTitle: 'Local Storage',
    privacyLocalStorageText: 'The only stored information is your language preference and theme setting, which is stored locally in your browser. This data is not transmitted to servers.',
    privacyCloudflareTitle: 'Cloudflare',
    privacyCloudflareText: 'This website is served via Cloudflare. Cloudflare may process technically necessary connection data.',
    privacyContactTitle: 'Contact',
    privacyContactText: 'If you have questions, you can contact us:',
  }
} as const;

export type TranslationKey = keyof typeof translations.de;
export type Translations = Record<TranslationKey, string>;
