import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Record from '@/ui/Record';
import { MoveRight } from 'lucide-react';
import { useResolvedPath } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const RecordTimeline = ({linkRecords, address, buttonFunction}) => {
    const pathname = useResolvedPath().pathname;
    
  return (
    <div className="flex flex-wrap gap-1">
                {linkRecords.map((record, recordIndex) => (
                  <div key={recordIndex} className="flex items-center gap-1">    
                      <div className="border select-none">
                        <div className='px-5 py-4 border-b w-full flex items-center justify-center'>
                            <p className="font-semibold leading-none w-max">{record.title}</p>
                        </div>
                        <div className='flex w-full'>
                            <div className='w-full flex-1 flex justify-center items-center'>
                                <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full rounded-none">
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
                      </div>
                      {recordIndex !== linkRecords.length - 1 && <MoveRight />}  
                  </div>
                ))}
              </div>
  )
}
