import { useState } from "react";
import Record from "./Record";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Records({ address, records }) {


  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              {index + 1}. {linkRecords[0].title}
            </AccordionTrigger>
            <AccordionContent>
             <div
                className="relative ml-4 pl-4 border-l-2 border-gray-300"
              >
                {linkRecords.map((record, recordIndex) => (
                  <div
                    key={recordIndex}
                    className="relative mb-8"
                  >
                    <div className="absolute -left-6 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="pl-8">
                      <p className="font-semibold">{record.title}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-2">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Record Details</DialogTitle>
                            <DialogDescription>
                              Details of the selected record.
                            </DialogDescription>
                          </DialogHeader>
                          <Record recordData={{ address, ...record }} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
