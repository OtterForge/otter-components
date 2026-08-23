export interface ComponentDoc {
  slug: string;
  name: string;
  group: 'Foundations' | 'Actions' | 'Inputs' | 'Data display' | 'Feedback';
  description: string;
  useWhen: string[];
  avoidWhen: string[];
  rules: string[];
  code: string;
}

const doc = (
  slug: string,
  name: string,
  group: ComponentDoc['group'],
  description: string,
  code: string,
  rules: string[] = [],
): ComponentDoc => ({
  slug,
  name,
  group,
  description,
  code,
  useWhen: [`Use ${name} when its familiar pattern makes the interface easier to understand.`],
  avoidWhen: [`Avoid ${name} when plain content or a simpler control communicates the same thing.`],
  rules: rules.length
    ? rules
    : [
        'Provide a clear accessible name.',
        'Keep labels concise and specific.',
        'Never communicate meaning through color alone.',
      ],
});

export const componentDocs: ComponentDoc[] = [
  doc(
    'theme-provider',
    'ThemeProvider',
    'Foundations',
    'Supplies color palettes, density, contrast, motion and typography tokens to every component.',
    `<ThemeProvider primaryColor="#20ada4" secondaryColor="#8b5cf6">\n  <App />\n</ThemeProvider>`,
    [
      'Primary and secondary colors are required.',
      'Place one provider at the application root.',
      'Respect the user’s reduced-motion preference.',
    ],
  ),
  doc(
    'tooltip-provider',
    'TooltipProvider',
    'Foundations',
    'Replaces native title tooltips with a consistent, accessible popup.',
    `<TooltipProvider>\n  <Button title="Saves all changes">Save</Button>\n</TooltipProvider>`,
    [
      'Wrap the interactive application once.',
      'Use title only for supplementary information.',
      'Do not hide essential instructions inside a tooltip.',
    ],
  ),
  doc(
    'css-api',
    'CSS API',
    'Foundations',
    'Documents the public CSS custom properties and utility classes available to applications.',
    `<div className="otter-scrollbar">…</div>\n\n.custom-panel {\n  padding: var(--otter-space-4);\n  border-radius: var(--otter-radius-lg);\n  background: var(--otter-surface);\n  color: var(--otter-text);\n}`,
    [
      'Use semantic tokens before palette shades.',
      'Do not replace token values inside component styles.',
      'Utility classes may be combined with application-specific classes.',
    ],
  ),
  doc(
    'heading',
    'Heading',
    'Foundations',
    'Separates semantic heading levels from their visual style.',
    `<Heading as="h1" variant="display">Design system</Heading>\n<Heading as="h2" variant="h1">Overview</Heading>`,
  ),
  doc(
    'text',
    'Text',
    'Foundations',
    'Provides scalable body, metadata, caption and monospace text roles.',
    `<Text variant="bodyLarge">Introduction</Text>\n<Text variant="meta" muted>Updated 15 minutes ago</Text>`,
  ),
  doc(
    'button',
    'Button',
    'Actions',
    'Triggers a clear, immediate action with a visible hierarchy.',
    `<Button>Save changes</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="danger">Delete</Button>`,
    [
      'Start labels with a specific verb.',
      'Use one primary button per action group.',
      'Use danger only for destructive actions.',
    ],
  ),
  doc(
    'icon-button',
    'IconButton',
    'Actions',
    'Presents a compact action using an icon and accessible label.',
    `<IconButton label="Open settings" icon={<i className="fas fa-gear" />} />`,
    [
      'Always provide label.',
      'Load icons through CSS class names.',
      'Do not use ambiguous icons without a tooltip.',
    ],
  ),
  doc(
    'input',
    'Input',
    'Inputs',
    'Collects a single line of text, numbers, currency or percentages.',
    `<Input label="Budget" prefix="€" suffix="EUR" required />\n<Input label="Discount" suffix="%" />\n<Input label="Project code" error="Use uppercase letters only." />`,
    [
      'Every input needs a visible label.',
      'Keep units outside the editable value.',
      'Explain how to correct invalid input.',
    ],
  ),
  doc(
    'textarea',
    'Textarea',
    'Inputs',
    'Collects longer, multi-line text.',
    `<Textarea label="Message" placeholder="Add context…" />`,
  ),
  doc(
    'checkbox',
    'Checkbox',
    'Inputs',
    'Toggles independent choices in a set.',
    `<Checkbox label="Send weekly summary" defaultChecked />`,
  ),
  doc(
    'radio',
    'Radio',
    'Inputs',
    'Selects exactly one choice from a visible group.',
    `<Radio name="billing" label="Monthly" defaultChecked />\n<Radio name="billing" label="Yearly" />`,
  ),
  doc(
    'switch',
    'Switch',
    'Inputs',
    'Changes a setting immediately between on and off.',
    `<Switch label="Automatic saving" defaultChecked />`,
    [
      'Use for immediate settings, not form confirmation.',
      'Write labels that describe the enabled state.',
      'Do not use for actions that require submission.',
    ],
  ),
  doc(
    'combo-box',
    'ComboBox',
    'Inputs',
    'Filters and selects from a large custom option list.',
    `<ComboBox label="Team member" options={people} />`,
    [
      'Use for searchable option sets.',
      'Support arrows, Enter and Escape.',
      'Keep option labels unique.',
    ],
  ),
  doc(
    'dropdown',
    'Dropdown',
    'Inputs',
    'Selects from a short custom option list without a native popup.',
    `<Dropdown label="Role" options={roles} />`,
    [
      'Use for a short closed list.',
      'Prefer radio buttons when only two choices exist.',
      'Support arrows, Enter and Escape.',
    ],
  ),
  doc(
    'slider',
    'Slider',
    'Inputs',
    'Selects an approximate value within a bounded range.',
    `<Slider label="Volume" min={0} max={100} defaultValue={64} />`,
  ),
  doc(
    'range-slider',
    'RangeSlider',
    'Inputs',
    'Selects a lower and upper value within one range.',
    `<RangeSlider label="Budget range" value={range} onChange={setRange} />`,
  ),
  doc(
    'accordion',
    'Accordion',
    'Data display',
    'Reveals optional sections and supports limited nesting.',
    `<Accordion>\n  <AccordionItem title="General" defaultOpen>Content</AccordionItem>\n  <AccordionItem title="Advanced">Content</AccordionItem>\n</Accordion>`,
    [
      'Use descriptive item titles.',
      'Limit nesting to two levels.',
      'Keep task-critical content visible.',
    ],
  ),
  doc(
    'list',
    'List',
    'Data display',
    'Displays scan-friendly rows with primary and secondary information.',
    `<List>\n  <ListItem title="Ava Stone" description="Updated the project" meta="09:12" />\n</List>`,
  ),
  doc(
    'table',
    'Table',
    'Data display',
    'Compares structured records across consistent columns.',
    `<Table>\n  <TableHead><TableRow><TableHeader>Component</TableHeader></TableRow></TableHead>\n  <TableBody><TableRow><TableCell>Button</TableCell></TableRow></TableBody>\n</Table>`,
  ),
  doc(
    'card',
    'Card',
    'Data display',
    'Groups related content and optional actions into a distinct surface.',
    `<Card interactive>\n  <Heading as="h3" variant="h2">Design tokens</Heading>\n  <Text>Shared decisions for every product.</Text>\n</Card>`,
  ),
  doc(
    'avatar',
    'Avatar',
    'Data display',
    'Represents a person with an image or generated initials.',
    `<Avatar name="Ava Stone" src="/ava.jpg" />\n<Avatar name="Noah Reed" />`,
  ),
  doc(
    'avatar-stack',
    'AvatarStack',
    'Data display',
    'Shows a compact overlapping group of people.',
    `<AvatarStack>\n  <Avatar name="Ava Stone" />\n  <Avatar name="Noah Reed" />\n</AvatarStack>`,
  ),
  doc(
    'image-grid',
    'ImageGrid',
    'Data display',
    'Arranges a small image collection in a responsive grid.',
    `<ImageGrid images={[{ src: '/office.jpg', alt: 'Bright office' }]} />`,
  ),
  doc(
    'separator',
    'Separator',
    'Data display',
    'Creates a subtle visual boundary between related sections.',
    `<Separator />`,
  ),
  doc(
    'progress',
    'Progress',
    'Feedback',
    'Communicates measurable completion for an ongoing task.',
    `<Progress label="Import" value={72} />`,
  ),
  doc(
    'spinner',
    'Spinner',
    'Feedback',
    'Communicates activity when completion cannot be measured.',
    `<Spinner label="Loading results" />`,
  ),
  doc(
    'alert',
    'Alert',
    'Feedback',
    'Displays persistent, contextual status information.',
    `<Alert variant="warning" title="Connection unstable">\n  Changes are stored locally.\n</Alert>`,
  ),
  doc(
    'status-indicator',
    'StatusIndicator',
    'Feedback',
    'Shows a compact status with text and a visual indicator.',
    `<StatusIndicator pulse>All systems operational</StatusIndicator>`,
  ),
  doc(
    'toast',
    'Toast',
    'Feedback',
    'Confirms a non-blocking result temporarily.',
    `toast({ title: 'Notification', variant: 'default' });\ntoast({ title: 'New information', variant: 'info' });\ntoast({ title: 'Check your connection', variant: 'warning' });\ntoast({ title: 'Upload failed', variant: 'error' });`,
    [
      'Use for brief confirmation, not required decisions.',
      'Keep messages short.',
      'Do not place essential recovery instructions only in a toast.',
    ],
  ),
  doc(
    'pagination',
    'Pagination',
    'Feedback',
    'Moves through a known number of result pages.',
    `<Pagination page={page} pageCount={8} onChange={setPage} />`,
  ),
];

export const componentGroups = [...new Set(componentDocs.map(({ group }) => group))];
