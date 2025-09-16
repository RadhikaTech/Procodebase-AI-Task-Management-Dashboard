# Component Documentation

## Core UI Components

### Button
Reusable button component with multiple variants and sizes.

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `disabled`: boolean
- `onclick`: function

**Usage:**
\`\`\`svelte
<Button variant="default" onclick={handleClick}>
  Click me
</Button>
\`\`\`

### Input
Form input component with validation support.

**Props:**
- `value`: string (bindable)
- `placeholder`: string
- `disabled`: boolean
- `class`: string

**Usage:**
\`\`\`svelte
<Input bind:value={inputValue} placeholder="Enter text..." />
\`\`\`

### Modal
Accessible modal dialog with backdrop and keyboard support.

**Props:**
- `open`: boolean
- `onClose`: function
- `title`: string
- `description`: string

**Usage:**
\`\`\`svelte
<Modal open={isOpen} onClose={handleClose} title="Modal Title">
  <p>Modal content</p>
</Modal>
\`\`\`

## Task Components

### TaskCard
Displays individual task information with actions.

**Props:**
- `task`: Task object

**Features:**
- Status badge with color coding
- Edit and delete actions
- Formatted creation date
- Responsive design

### TaskForm
Form component for creating and editing tasks.

**Props:**
- `initialData`: Partial<TaskFormData>
- `onSubmit`: function
- `onCancel`: function
- `submitLabel`: string
- `isLoading`: boolean

**Features:**
- Client-side validation
- Real-time error display
- Loading states
- Accessibility support

### FilterBar
Search and filter controls for task management.

**Features:**
- Debounced search input
- Status filtering
- Sort options
- Active filter display
- Clear filters functionality

## Layout Components

### Sidebar
Navigation sidebar with task statistics and quick filters.

**Features:**
- Task count statistics
- Quick filter buttons
- Dark mode toggle
- Responsive collapse

### Header
Dashboard header with title and task statistics.

**Features:**
- Task count overview
- Responsive design
- Status breakdown

## Usage Guidelines

### Accessibility
- All components include proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Styling
- Components use design tokens from globals.css
- Consistent spacing and typography
- Responsive design patterns
- Dark mode support

### State Management
- Components integrate with Svelte stores
- Reactive updates
- Error handling
- Loading states
