import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Bookmark,
  CalendarCheck,
  Check,
  ClipboardList,
  CloudDownload,
  FileCheck2,
  LayoutDashboard,
  Library,
  Menu,
  Moon,
  NotebookPen,
  PieChart,
  Play,
  RefreshCw,
  Route,
  Sparkles,
  Sun,
  Target,
  X,
  createIcons
} from "lucide";

export const APP_ICONS = {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Bookmark,
  CalendarCheck,
  Check,
  ClipboardList,
  CloudDownload,
  FileCheck2,
  LayoutDashboard,
  Library,
  Menu,
  Moon,
  NotebookPen,
  PieChart,
  Play,
  RefreshCw,
  Route,
  Sparkles,
  Sun,
  Target,
  X
};

export type AppIconName =
  | "arrow-right"
  | "layout-dashboard"
  | "calendar-check"
  | "route"
  | "refresh-cw"
  | "book-open"
  | "sparkles"
  | "pie-chart"
  | "library"
  | "clipboard-list"
  | "bookmark"
  | "notebook-pen"
  | "badge-check"
  | "x"
  | "menu"
  | "play"
  | "moon"
  | "sun"
  | "bell"
  | "target"
  | "cloud-download"
  | "file-check-2"
  | "check";

export function icon(name: AppIconName, className = "ui-icon", size = 18): string {
  const sizeAttr = size ? ` style="width:${size}px;height:${size}px"` : "";
  return `<span class="${className}" data-lucide="${name}" aria-hidden="true"${sizeAttr}></span>`;
}

export function hydrateIcons(root: Document | Element | DocumentFragment = document): void {
  createIcons({
    icons: APP_ICONS,
    nameAttr: "data-lucide",
    attrs: {
      "stroke-width": 2
    },
    root
  });
}
