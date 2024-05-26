import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function Records({
  address,
  records,
  selected,
  Element,
  elementFunction,
}) {
  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex gap-1 text-base font-medium">
                {linkRecords[0].title}
                {selected?.includes(linkRecords[0].linkIndex) && (
                  <Badge className="bg-emerald-500 ml-2 hover:bg-emerald-500/90 gap-1">
                    <Check size={15} strokeWidth={3} />
                    Selected
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <RecordTimeline linkRecords={linkRecords} address={address} />
                </div>
                {Element && (
                  <Element
                    isSelected={selected?.includes(linkRecords[0].linkIndex)}
                    linkIndex={linkRecords[0].linkIndex}
                    elementFunction={elementFunction}
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
