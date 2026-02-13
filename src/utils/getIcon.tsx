import * as Icons from 'lucide-react';

// Helper function to get icon component by name
export function getIcon(iconName: string) {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.HelpCircle;
}
