import { useState } from 'react';
import { ThemeProvider, ToastProvider, TooltipProvider } from '@otter/components';
import { ComponentPage } from './components/ComponentPage/ComponentPage';
import { DocsSidebar } from './components/DocsSidebar/DocsSidebar';
import { PreviewHeader } from './components/PreviewHeader/PreviewHeader';
import { componentDocs } from './content/componentDocs';
import { useHashRoute } from './hooks/useHashRoute';

const Documentation = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}) => {
  const slug = useHashRoute();
  const component = componentDocs.find((item) => item.slug === slug) ?? componentDocs[0];
  return (
    <div className="docs-shell">
      <DocsSidebar currentSlug={component.slug} />
      <div className="docs-content">
        <PreviewHeader
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onPrimaryColorChange={onPrimaryColorChange}
          onSecondaryColorChange={onSecondaryColorChange}
        />
        <ComponentPage component={component} />
      </div>
    </div>
  );
};

export const App = () => {
  const [primaryColor, setPrimaryColor] = useState('#20ada4');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  return (
    <ThemeProvider primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <TooltipProvider>
        <ToastProvider>
          <Documentation
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPrimaryColorChange={setPrimaryColor}
            onSecondaryColorChange={setSecondaryColor}
          />
        </ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
