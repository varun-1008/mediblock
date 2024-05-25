import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecordTimeline } from "@/components/RecordTimeline";
import { Button } from "@/components/ui/button";
import { useResolvedPath } from "react-router-dom";
import { CalendarIcon, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import useWallet from "@/context/UseWallet";
import { ipfsUpload } from "@/utils/ipfs";
import { Buffer } from "buffer";

export function Records({ address, records, buttonFunction = () => {} }) {
  const pathname = useResolvedPath().pathname;
  const [selected, setSelected] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { signer, contract } = useWallet();

  const handleCheckboxChange = (linkIndex) => {
    setSelected((prevSelected) =>
      prevSelected.includes(linkIndex)
        ? prevSelected.filter((item) => item !== linkIndex)
        : [...prevSelected, linkIndex]
    );
    buttonFunction(linkIndex);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ipfsHash = "";
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      const ipfsData = await ipfsUpload(buffer);
      ipfsHash = ipfsData.IpfsHash;
    }

    const newFormValues = {
      ...formValues,
      date: date ? format(date, "yyyy-MM-dd") : "",
      file: ipfsHash,
    };

    console.log("Form submitted with values: ", newFormValues);

    // Reset form values
    setFormValues({
      title: "",
      date: "",
      content: "",
    });
    setFile(null);
    setDate(null);

    // Close the dialog
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-5">
      <Accordion type="single" collapsible className="w-full">
        {records.map((linkRecords, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex gap-1 text-base font-medium">
                {linkRecords[0].title}
                {selected.includes(linkRecords[0].linkIndex) && (
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
                  {pathname.includes("doctor/viewAppointments") && (
                    <>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus />
                      </Button>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogContent>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Title
                              </Label>
                              <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formValues.title}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <div>
                              <Label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Content
                              </Label>
                              <Textarea
                                id="content"
                                name="content"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={formValues.content}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="flex justify-between">
                              <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={handleFileChange}
                                required
                                className="w-max"
                              />
                              <Button type="submit">Add Record</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
                {pathname.includes("bookAppointment") && (
                  <div className="flex items-center gap-2 select-none">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={selected.includes(linkRecords[0].linkIndex)}
                        onChange={() => {
                          handleCheckboxChange(linkRecords[0].linkIndex);
                        }}
                      />
                      Select record
                    </Label>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
