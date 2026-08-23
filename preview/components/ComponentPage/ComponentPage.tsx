import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
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
  useTheme,
  useToast,
} from '@otter/components';
import { componentDocs, type ComponentDoc } from '../../content/componentDocs';
import { CodeExample } from '../CodeExample/CodeExample';
import { UsageRules } from '../UsageRules/UsageRules';

const people = [
  { value: 'ava', label: 'Ava Stone', description: 'Design' },
  { value: 'noah', label: 'Noah Reed', description: 'Engineering' },
];
const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const paletteTokens = ['primary', 'secondary'].flatMap((palette) =>
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => [
    `--otter-${palette}-${shade}`,
    `${palette[0].toUpperCase()}${palette.slice(1)} palette shade ${shade}`,
    'Provider colors',
  ]),
);

const cssTokens: string[][] = [
  ...paletteTokens,
  ['--otter-page', 'Application background', 'Theme'],
  ['--otter-surface', 'Default component surface', 'Theme'],
  ['--otter-surface-raised', 'Elevated component surface', 'Theme'],
  ['--otter-surface-soft', 'Subtle component surface', 'Theme'],
  ['--otter-text', 'Primary text color', 'Theme'],
  ['--otter-muted', 'Secondary text color', 'Theme'],
  ['--otter-border', 'Subtle boundary color', 'Theme'],
  ['--otter-action', 'Primary interactive color', 'Theme'],
  ['--otter-action-hover', 'Hovered interactive color', 'Theme'],
  ['--otter-focus', 'Keyboard focus color', 'Theme'],
  ['--otter-on-action', 'Content rendered on action colors', 'Theme'],
  ['--otter-on-primary-400', 'Readable content on primary 400', 'Provider colors'],
  ['--otter-on-primary-600', 'Readable content on primary 600', 'Provider colors'],
  ['--otter-on-secondary-500', 'Readable content on secondary 500', 'Provider colors'],
  ['--otter-control', 'Inactive control track', 'Theme'],
  ['--otter-control-hover', 'Hovered control track', 'Theme'],
  ['--otter-control-active', 'Selected control color', 'Theme'],
  ['--otter-control-ring', 'Control focus ring', 'Theme'],
  ['--otter-success', 'Successful status', 'Contrast'],
  ['--otter-success-soft', 'Successful status surface', 'Theme'],
  ['--otter-warning', 'Warning status', 'Contrast'],
  ['--otter-warning-soft', 'Warning status surface', 'Theme'],
  ['--otter-danger', 'Error or destructive status', 'Contrast'],
  ['--otter-danger-soft', 'Error status surface', 'Theme'],
  ['--otter-info', 'Informational status', 'Contrast'],
  ['--otter-info-soft', 'Informational status surface', 'Theme'],
  ['--otter-font', 'Primary font stack', 'Provider'],
  ['--otter-font-mono', 'Monospace font stack', 'Provider'],
  ['--otter-fs-display', 'Display typography role', 'S / M / L'],
  ['--otter-fs-h1', 'Primary heading role', 'S / M / L'],
  ['--otter-fs-h2', 'Secondary heading role', 'S / M / L'],
  ['--otter-fs-body-lg', 'Prominent body copy', 'S / M / L'],
  ['--otter-fs-body', 'Default interface copy', 'S / M / L'],
  ['--otter-fs-meta', 'Metadata copy', 'S / M / L'],
  ['--otter-fs-caption', 'Supporting compact copy', 'S / M / L'],
  ['--otter-fs-micro', 'Smallest interface copy', 'S / M / L'],
  ['--otter-text-xs', 'Deprecated caption alias', 'S / M / L'],
  ['--otter-text-sm', 'Deprecated body alias', 'S / M / L'],
  ['--otter-text-md', 'Deprecated large-body alias', 'S / M / L'],
  ['--otter-lh-display', 'Display line height', 'Static'],
  ['--otter-lh-heading', 'Heading line height', 'Static'],
  ['--otter-lh-body', 'Body line height', 'Static'],
  ...[1, 2, 3, 4, 5, 6, 8].map((step) => [
    `--otter-space-${step}`,
    `Spacing step ${step}`,
    'S / M / L',
  ]),
  ['--otter-radius-sm', 'Small component radius', 'Static'],
  ['--otter-radius-md', 'Medium component radius', 'Static'],
  ['--otter-radius-lg', 'Large component radius', 'Static'],
  ['--otter-radius-xl', 'Extra-large component radius', 'Static'],
  ['--otter-radius-full', 'Pill and circular radius', 'Static'],
  ['--otter-control-h', 'Default control height', 'S / M / L'],
  ['--otter-type-scale', 'Internal density multiplier', 'S / M / L'],
  ['--otter-density', 'Internal layout density multiplier', 'S / M / L'],
  ['--otter-icon-size', 'Default icon size', 'S / M / L'],
  ['--otter-avatar-s', 'Small avatar size', 'S / M / L'],
  ['--otter-avatar-m', 'Medium avatar size', 'S / M / L'],
  ['--otter-avatar-l', 'Large avatar size', 'S / M / L'],
  ['--otter-spinner-size', 'Spinner size', 'S / M / L'],
  ['--otter-status-size', 'Status indicator size', 'S / M / L'],
  ['--otter-track-size', 'Slider and progress track size', 'S / M / L'],
  ['--otter-focus-size', 'Keyboard focus outline width', 'Contrast'],
  ['--otter-shadow-sm', 'Subtle elevation shadow', 'Theme'],
  ['--otter-shadow-md', 'Raised overlay shadow', 'Theme'],
  ['--otter-motion-fast', 'Fast transition duration', 'Motion'],
  ['--otter-motion-normal', 'Default transition duration', 'Motion'],
  ['--otter-motion-slow', 'Emphasized transition duration', 'Motion'],
  ['--otter-ease', 'Default animation easing', 'Motion'],
];

const cssClasses = [
  [
    '.otter-scrollbar',
    'Styles scrollbars without buttons or a track background',
    'Overflow containers',
  ],
  ['.fas', 'Font Awesome solid icon style', 'Icon class provider'],
  ['.far', 'Font Awesome regular icon style', 'Icon class provider'],
  ['.fa-*', 'Selects a specific Font Awesome glyph', 'Combine with .fas or .far'],
];

const getTokenPreviewKind = (name: string) => {
  if (/font(-mono)?$/.test(name)) return 'font-family';
  if (/type-scale|density$/.test(name)) return 'scale';
  if (/control-ring/.test(name)) return 'ring';
  if (
    /page$|primary|secondary|surface|text$|muted|border|action|focus$|control($|-hover|-active)|success|warning|danger|info|--otter-on-(action|primary|secondary)/.test(
      name,
    )
  )
    return 'color';
  if (/fs-|text-(xs|sm|md)/.test(name)) return 'font';
  if (/radius/.test(name)) return 'radius';
  if (/shadow/.test(name)) return 'shadow';
  if (/ease/.test(name)) return 'ease';
  if (/motion/.test(name)) return 'motion';
  if (/space|size|control-h|avatar|track|focus-size/.test(name)) return 'size';
  if (/lh-/.test(name)) return 'line-height';
  return 'value';
};

const TokenPreview = ({ name }: { name: string }) => {
  const kind = getTokenPreviewKind(name);
  const previewRef = useRef<HTMLDivElement>(null);
  const [resolvedValue, setResolvedValue] = useState('');
  const theme = useTheme();
  const style = { '--docs-token-value': `var(${name})` } as CSSProperties;
  useLayoutEffect(() => {
    if (!previewRef.current) return;
    setResolvedValue(getComputedStyle(previewRef.current).getPropertyValue(name).trim());
  }, [name, theme.contrast, theme.density, theme.motion, theme.theme]);
  return (
    <div
      ref={previewRef}
      className={`docs-token-preview docs-token-preview--${kind}`}
      style={style}
    >
      {kind === 'font' && <span>Aa</span>}
      {kind === 'font-family' && <span>Otter Aa</span>}
      {kind === 'scale' && <span>Aa</span>}
      {kind === 'line-height' && (
        <span>
          Line
          <br />
          height
        </span>
      )}
      {kind === 'motion' && (
        <>
          <span aria-label="Animated token preview" />
          <code>{resolvedValue}</code>
        </>
      )}
      {kind === 'ease' && (
        <>
          <span aria-label="Animated easing preview" />
          <code>{resolvedValue}</code>
        </>
      )}
      {kind === 'value' && <code>var({name})</code>}
    </div>
  );
};

const Demo = ({ slug }: { slug: string }) => {
  const [range, setRange] = useState<[number, number]>([20, 76]);
  const [page, setPage] = useState(2);
  const { toast } = useToast();
  switch (slug) {
    case 'theme-provider':
      return (
        <div className="token-preview">
          <span>Primary</span>
          <span>Secondary</span>
          <span>Surface</span>
          <span>Text</span>
        </div>
      );
    case 'tooltip-provider':
      return <Button title="This tooltip is styled by TooltipProvider">Focus or hover me</Button>;
    case 'css-api':
      return (
        <div className="demo-stack">
          <Heading as="h3" variant="h2">
            Design tokens
          </Heading>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Variable</TableHeader>
                <TableHeader>Purpose</TableHeader>
                <TableHeader>Responds to</TableHeader>
                <TableHeader>Preview</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {cssTokens.map(([name, purpose, behavior]) => (
                <TableRow key={name}>
                  <TableCell>
                    <code>{name}</code>
                  </TableCell>
                  <TableCell>{purpose}</TableCell>
                  <TableCell>{behavior}</TableCell>
                  <TableCell>
                    <TokenPreview name={name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Heading as="h3" variant="h2">
            Utility and icon classes
          </Heading>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Class</TableHeader>
                <TableHeader>Purpose</TableHeader>
                <TableHeader>Usage</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {cssClasses.map(([name, purpose, usage]) => (
                <TableRow key={name}>
                  <TableCell>
                    <code>{name}</code>
                  </TableCell>
                  <TableCell>{purpose}</TableCell>
                  <TableCell>{usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    case 'heading':
      return (
        <div className="demo-stack">
          <Heading as="h2" variant="display">
            Display heading
          </Heading>
          <Heading as="h3" variant="h1">
            Section heading
          </Heading>
        </div>
      );
    case 'text':
      return (
        <div className="demo-stack">
          <Text variant="bodyLarge">A prominent introduction.</Text>
          <Text variant="body">Regular interface copy scales with density.</Text>
          <Text variant="meta" muted>
            Updated 15 minutes ago
          </Text>
        </div>
      );
    case 'button':
      return (
        <div className="demo-row">
          <Button>Save changes</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="danger">Delete</Button>
        </div>
      );
    case 'icon-button':
      return (
        <div className="demo-row">
          <IconButton label="Open settings" icon={<i className="fas fa-gear" />} />
          <IconButton label="Add item" variant="primary" icon={<i className="fas fa-plus" />} />
        </div>
      );
    case 'input':
      return (
        <div className="demo-grid">
          <Input label="Budget" prefix="€" suffix="EUR" defaultValue="12,500.00" required />
          <Input label="Discount" suffix="%" defaultValue="15" />
          <Input
            label="Project code"
            defaultValue="ui lib!"
            error="Use uppercase letters and numbers only."
          />
        </div>
      );
    case 'textarea':
      return <Textarea label="Message" placeholder="Add context…" />;
    case 'checkbox':
      return (
        <div className="demo-stack">
          <Checkbox label="Send weekly summary" defaultChecked />
          <Checkbox label="Include archived projects" />
        </div>
      );
    case 'radio':
      return (
        <div className="demo-stack">
          <Radio name="billing" label="Monthly" defaultChecked />
          <Radio name="billing" label="Yearly" />
        </div>
      );
    case 'switch':
      return (
        <div className="demo-stack">
          <Switch label="Automatic saving" defaultChecked />
          <Switch label="Desktop notifications" />
        </div>
      );
    case 'combo-box':
      return <ComboBox label="Team member" options={people} />;
    case 'dropdown':
      return <Dropdown label="Role" options={roles} />;
    case 'slider':
      return <Slider label="Volume" defaultValue={64} />;
    case 'range-slider':
      return (
        <RangeSlider
          label="Budget range"
          value={range}
          onChange={setRange}
          formatValue={(value) => `€${value}k`}
        />
      );
    case 'accordion':
      return (
        <Accordion>
          <AccordionItem title="General settings" defaultOpen>
            Basic project options.
            <Accordion>
              <AccordionItem title="Notifications">Email and push settings.</AccordionItem>
            </Accordion>
          </AccordionItem>
          <AccordionItem title="Advanced options">API access and experiments.</AccordionItem>
        </Accordion>
      );
    case 'list':
      return (
        <List>
          <ListItem
            avatar={<Avatar name="Ava Stone" />}
            title="Ava Stone"
            description="Updated the design proposal"
            meta="09:12"
            unread
          />
          <ListItem
            avatar={<Avatar name="Noah Reed" />}
            title="Noah Reed"
            description="Commented on the API"
            meta="08:40"
          />
        </List>
      );
    case 'table':
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Component</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Button</TableCell>
              <TableCell>
                <StatusIndicator>Ready</StatusIndicator>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ComboBox</TableCell>
              <TableCell>
                <StatusIndicator>Ready</StatusIndicator>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case 'card':
      return (
        <div className="demo-grid">
          <Card interactive>
            <Heading as="h3" variant="h2">
              Design tokens
            </Heading>
            <Text>Shared decisions for consistent products.</Text>
          </Card>
          <Card>
            <Heading as="h3" variant="h2">
              Accessibility
            </Heading>
            <Text>Keyboard and assistive technology included.</Text>
          </Card>
        </div>
      );
    case 'avatar':
      return (
        <div className="demo-row">
          <Avatar name="Ava Stone" size="l" />
          <Avatar name="Noah Reed" />
          <Avatar name="Mia Clark" size="s" />
        </div>
      );
    case 'avatar-stack':
      return (
        <AvatarStack>
          <Avatar name="Ava Stone" />
          <Avatar name="Noah Reed" />
          <Avatar name="Mia Clark" />
          <Avatar name="Leo Grant" />
        </AvatarStack>
      );
    case 'image-grid':
      return (
        <ImageGrid
          images={[
            {
              src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
              alt: 'Bright office',
            },
            {
              src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
              alt: 'Meeting room',
            },
          ]}
        />
      );
    case 'separator':
      return (
        <div>
          <Text>Content above</Text>
          <Separator />
          <Text>Content below</Text>
        </div>
      );
    case 'progress':
      return <Progress label="Import" value={72} />;
    case 'spinner':
      return <Spinner label="Loading results" />;
    case 'alert':
      return (
        <div className="demo-stack">
          <Alert title="New version available">Review the latest changes.</Alert>
          <Alert variant="warning" title="Connection unstable">
            Changes are stored locally.
          </Alert>
        </div>
      );
    case 'status-indicator':
      return (
        <div className="demo-row">
          <StatusIndicator pulse>Operational</StatusIndicator>
          <StatusIndicator status="warning">Delayed</StatusIndicator>
        </div>
      );
    case 'toast':
      return (
        <div className="demo-row">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Notification',
                description: 'A neutral update without urgency.',
                variant: 'default',
              })
            }
          >
            Default
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'New information',
                description: 'The report is ready to review.',
                variant: 'info',
              })
            }
          >
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Check your connection',
                description: 'Changes remain stored locally.',
                variant: 'warning',
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              toast({
                title: 'Upload failed',
                description: 'Try the upload again.',
                variant: 'error',
              })
            }
          >
            Error
          </Button>
        </div>
      );
    case 'pagination':
      return <Pagination page={page} pageCount={8} onChange={setPage} />;
    default:
      return null;
  }
};

export const ComponentPage = ({ component }: { component: ComponentDoc }) => {
  const index = componentDocs.findIndex(({ slug }) => slug === component.slug);
  const previous = componentDocs[index - 1];
  const next = componentDocs[index + 1];
  return (
    <main className="docs-page">
      <div className="docs-breadcrumbs">
        <a href="#/components/button">Components</a>
        <i className="fas fa-chevron-right" aria-hidden="true" />
        <span>{component.name}</span>
      </div>
      <header className="docs-page-header">
        <span>{component.group}</span>
        <h1>{component.name}</h1>
        <p>{component.description}</p>
      </header>
      <section>
        <h2>Demo</h2>
        <p>
          Interact with the component using a pointer or keyboard. Global display settings are
          available in the header.
        </p>
        <div className="docs-live-demo">
          <Demo slug={component.slug} />
        </div>
        <CodeExample
          title="Basic usage"
          description={`A practical ${component.name} example.`}
          code={component.code}
        />
      </section>
      <section>
        <h2>Usage</h2>
        <p>Choose components by meaning and interaction pattern, not only by appearance.</p>
        <UsageRules
          useWhen={component.useWhen}
          avoidWhen={component.avoidWhen}
          rules={component.rules}
        />
      </section>
      <nav className="docs-page-pagination" aria-label="Component pages">
        {previous ? (
          <a href={`#/components/${previous.slug}`}>
            <i className="fas fa-arrow-left" aria-hidden="true" />
            <span>
              <small>Previous</small>
              {previous.name}
            </span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#/components/${next.slug}`}>
            <span>
              <small>Next</small>
              {next.name}
            </span>
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </a>
        )}
      </nav>
    </main>
  );
};
