import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";

export function Records({ address, records, buttonFunction }) {
  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              {index + 1}. {linkRecords[0].title}
            </AccordionTrigger>
            <AccordionContent>
             <RecordTimeline linkRecords={linkRecords} address={address} buttonFunction={buttonFunction} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
