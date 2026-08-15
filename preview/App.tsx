import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  AvatarStack,
  Button,
  Card,
  Checkbox,
  ComboBox,
  Dropdown,
  Heading,
  IconButton,
  ImageGrid,
  Input,
  List,
  ListItem,
  Pagination,
  Progress,
  Radio,
  RangeSlider,
  Separator,
  Slider,
  Spinner,
  StatusIndicator,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
  ThemeProvider,
  ToastProvider,
  TooltipProvider,
  useToast,
} from '@otter/components';
import { PreviewHeader } from './components/PreviewHeader/PreviewHeader';
import { ComponentSection } from './components/ComponentSection/ComponentSection';
const people = [
  { value: 'aylin', label: 'Aylin Kaya', description: 'Design' },
  { value: 'jonas', label: 'Jonas Weber', description: 'Development' },
  { value: 'mia', label: 'Mia Schneider', description: 'Research' },
];
const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Betrachter' },
];
const Demos = () => {
  const [query, setQuery] = useState(''),
    [range, setRange] = useState<[number, number]>([18, 76]),
    [page, setPage] = useState(2),
    { toast } = useToast();
  return (
    <>
      <PreviewHeader query={query} onQuery={setQuery} />
      <main id="top" className="preview-main">
        <section className="preview-hero">
          <span>React + TypeScript</span>
          <h1>
            Konsequent tokenbasiert.
            <br />
            Von Anfang an zugänglich.
          </h1>
          <p>
            Eine eigenständige Komponentenbibliothek mit Themes, Dichte, Kontrastmodi, Motion-System
            und vollständiger Tastaturbedienung.
          </p>
        </section>
        <ComponentSection
          query={query}
          title="Typografie"
          description="Semantische Textrollen skalieren gemeinsam mit der globalen Dichte S, M und L."
        >
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Heading as="h2" variant="display">
              Display
            </Heading>
            <Heading as="h2" variant="h1">
              Seitenüberschrift H1
            </Heading>
            <Heading as="h3" variant="h2">
              Abschnittsüberschrift H2
            </Heading>
            <Text variant="bodyLarge">Body Large für hervorgehobene Einleitungen.</Text>
            <Text variant="body">Body für Formulare, Listen und Fließtext.</Text>
            <Text variant="meta" muted>
              Meta · vor 15 Minuten · an drei Personen
            </Text>
            <Text variant="caption">Caption für kompakte Beschriftungen</Text>
            <Text variant="micro" mono>
              MICRO · --otter-fs-micro
            </Text>
          </div>
        </ComponentSection>
        <ComponentSection
          query={query}
          title="Button & IconButton"
          description="Aktionen in vier Hierarchiestufen."
        >
          <div className="preview-row">
            <Button title="Änderungen speichern">Speichern</Button>
            <Button variant="secondary">Abbrechen</Button>
            <Button variant="ghost">Mehr erfahren</Button>
            <Button variant="danger">Löschen</Button>
            <IconButton label="Einstellungen" icon="⚙" />
          </div>
        </ComponentSection>
        <ComponentSection
          query={query}
          title="Formulare"
          description="Subtile Flächen, klare Fokus- und Fehlerzustände."
        >
          <div className="preview-grid">
            <Input label="Budget" prefix="€" suffix="EUR" defaultValue="12.500,00" required />
            <Input label="Rabatt" suffix="%" defaultValue="15" />
            <Input
              label="Projektcode"
              prefix="#"
              defaultValue="ui lib!"
              error="Nur Großbuchstaben, Zahlen und Bindestriche sind erlaubt."
            />
            <Textarea label="Nachricht" placeholder="Worum geht es?" />
            <Checkbox label="Benachrichtigungen aktivieren" defaultChecked />
            <Radio name="billing" label="Monatlich" defaultChecked />
            <Radio name="billing" label="Jährlich" />
            <Switch label="Automatisch speichern" defaultChecked />
          </div>
        </ComponentSection>
        <ComponentSection
          query={query}
          title="Combobox & Dropdown"
          description="Eigene Implementierung ohne native Auswahl-Popups."
        >
          <div className="preview-grid">
            <ComboBox label="Teammitglied" options={people} />
            <Dropdown label="Rolle" options={roles} />
          </div>
        </ComponentSection>
        <ComponentSection query={query} title="Slider & Fortschritt">
          <div className="preview-grid">
            <Slider label="Lautstärke" defaultValue={64} />
            <RangeSlider
              label="Budgetrahmen"
              value={range}
              onChange={setRange}
              formatValue={(v: number) => `€ ${v}.000`}
            />
            <Progress label="Import" value={72} />
            <StatusIndicator pulse>Alle Systeme bereit</StatusIndicator>
            <Spinner />
          </div>
        </ComponentSection>
        <ComponentSection
          query={query}
          title="Accordion"
          description="Animiert, verschachtelbar und tastaturfähig."
        >
          <Accordion>
            <AccordionItem title="Allgemeine Einstellungen" defaultOpen>
              Grundlegende Optionen für das Projekt.
              <div style={{ marginTop: 12 }}>
                <Accordion>
                  <AccordionItem title="Benachrichtigungen">
                    E-Mail, Push und Zusammenfassungen.
                  </AccordionItem>
                  <AccordionItem title="Datenschutz">Sichtbarkeit und Freigaben.</AccordionItem>
                </Accordion>
              </div>
            </AccordionItem>
            <AccordionItem title="Erweiterte Optionen">
              Caching, API-Zugriff und Experimente.
            </AccordionItem>
          </Accordion>
        </ComponentSection>
        <ComponentSection query={query} title="Listen">
          <List>
            <ListItem
              avatar={<Avatar name="Eva Fischer" />}
              title="Eva Fischer"
              description="Meeting wurde auf Donnerstag verschoben"
              meta="09:12"
              unread
            />
            <ListItem
              avatar={<Avatar name="Thomas Dahm" />}
              title="Thomas Dahm"
              description="Danke für den Hinweis, ich passe es an"
              meta="08:40"
            />
            <ListItem
              avatar={<Avatar name="Thea Mau" />}
              title="Thea Mau"
              description="Frage zum neuen Komponentenvertrag"
              meta="Mi"
            />
          </List>
        </ComponentSection>
        <ComponentSection query={query} title="Tabelle">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Komponente</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Varianten</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Button</TableCell>
                <TableCell>
                  <StatusIndicator>Bereit</StatusIndicator>
                </TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Combobox</TableCell>
                <TableCell>
                  <StatusIndicator>Bereit</StatusIndicator>
                </TableCell>
                <TableCell>Single Select</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ComponentSection>
        <ComponentSection query={query} title="Karten, Avatare & Bilder">
          <div className="preview-cards">
            <Card interactive>
              <h3>Design Tokens</h3>
              <p>Zentrale Werte für konsistente Oberflächen.</p>
            </Card>
            <Card interactive>
              <h3>Accessibility</h3>
              <p>Tastatur und assistive Technologien inklusive.</p>
            </Card>
            <Card>
              <AvatarStack>
                {[...people, ...roles].map((item) => (
                  <Avatar key={item.value} name={item.label} />
                ))}
              </AvatarStack>
            </Card>
          </div>
          <Separator />
          <ImageGrid
            images={[
              {
                src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
                alt: 'Moderner Arbeitsbereich',
              },
              {
                src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
                alt: 'Besprechungsraum',
              },
              {
                src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80',
                alt: 'Teamarbeitsplatz',
              },
            ]}
          />
        </ComponentSection>
        <ComponentSection query={query} title="Feedback & Navigation">
          <div className="preview-grid">
            <Alert title="Neue Version verfügbar">
              Die Änderungen können jetzt geprüft werden.
            </Alert>
            <Alert variant="warning" title="Verbindung instabil">
              Änderungen werden lokal gespeichert.
            </Alert>
            <Button
              onClick={() =>
                toast({
                  title: 'Erfolgreich gespeichert',
                  description: 'Alle Änderungen sind aktuell.',
                  variant: 'success',
                })
              }
            >
              Toast anzeigen
            </Button>
            <Pagination page={page} pageCount={8} onChange={setPage} />
          </div>
        </ComponentSection>
      </main>
    </>
  );
};
export const App = () => {
  return (
    <ThemeProvider primaryColor="#20ada4" secondaryColor="#8b5cf6">
      <TooltipProvider>
        <ToastProvider>
          <Demos />
        </ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
