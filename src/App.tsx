import { I18nProvider } from './i18n';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { InputPanel } from './components/InputPanel/InputPanel';
import { ResultsPanel } from './components/ResultsPanel/ResultsPanel';
import { DistanceTable } from './components/ResultsPanel/DistanceTable';
import { SafetyZoneDiagram } from './components/Visualizations/SafetyZoneDiagram';
import { PowerDensityChart } from './components/Visualizations/PowerDensityChart';
import { MultiBandPanel } from './components/MultiBandPanel/MultiBandPanel';
import { EducationalContent } from './components/EducationalContent/EducationalContent';
import { PdfExportButton } from './components/PdfExport/PdfExportButton';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <InputPanel />
            <MultiBandPanel />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="flex justify-end">
              <PdfExportButton />
            </div>
            <ResultsPanel />
            <SafetyZoneDiagram />
            <PowerDensityChart />
            <DistanceTable />
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-8">
          <EducationalContent />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </I18nProvider>
  );
}

export default App;
