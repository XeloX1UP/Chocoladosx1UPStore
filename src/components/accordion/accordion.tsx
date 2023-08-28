import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionX({
  title,
  subtitle,
  children,
  plus,
  panel,
  expanded,
  onChange,
}: {
  title: string;
  plus?: string;
  subtitle: string;
  children: any;
  panel: number;
  expanded: boolean;
  onChange: (isExpanded: boolean) => void;
}) {
  return (
    <Accordion
      expanded={expanded}
      onChange={(event, isExpanded) => onChange(isExpanded)}
      className="!bg-[var(--bg-200)] !text-[var(--text-100)]"
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className="text-[var(--primary-100)] bg-[var(--bg-100)] rounded-full" />
        }
        aria-controls={`panel${panel}bh-content`}
        id={`panel${panel}bh-header`}
      >
        <Typography className="w-1/3 flex-shrink-0 text-[var(--primary-100)]">
          {title}
        </Typography>
        <Typography>
          {subtitle}{" "}
          <span className="text-xs text-[var(--accent-100)]">
            {plus ? plus : ""}
          </span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
