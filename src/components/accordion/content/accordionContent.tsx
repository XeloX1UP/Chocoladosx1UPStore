export default function AccordionContent({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <div className="flex my-2">
      <div className="w-1/2 text-[var(--primary-200)]">{title}</div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}
