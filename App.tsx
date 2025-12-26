import React, { useState } from 'react';
import { AppView, CalculatorType } from './types';
import Sidebar from './components/Sidebar';
import TrabalhistaHub from './screens/TrabalhistaHub';
import CalculationForm from './screens/CalculationForm';
import Settings from './screens/Settings';
import Help from './screens/Help';
import ExportPDF from './screens/ExportPDF';

const App: React.FC = () => {
  // Inicia diretamente no Hub de Cálculos Trabalhistas
  const [currentView, setCurrentView] = useState<AppView>(AppView.TRABALHISTA_HUB);
  const [activeCalc, setActiveCalc] = useState<CalculatorType>(CalculatorType.RESCISAO);

  const navigateTo = (view: AppView, calcType?: CalculatorType) => {
    if (calcType) setActiveCalc(calcType);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.TRABALHISTA_HUB:
        return <TrabalhistaHub navigateTo={navigateTo} />;
      case AppView.CALCULATION_FORM:
        return <CalculationForm navigateTo={navigateTo} calcType={activeCalc} />;
      case AppView.SETTINGS:
        return <Settings navigateTo={navigateTo} />;
      case AppView.HELP:
        return <Help navigateTo={navigateTo} />;
      case AppView.EXPORT:
        return <ExportPDF navigateTo={navigateTo} />;
      default:
        return <TrabalhistaHub navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden text-slate-900 dark:text-white">
      <Sidebar currentView={currentView} navigateTo={navigateTo} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
};

export default App;