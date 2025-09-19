// import React from 'react'
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
// import { ComboboxDemo } from './SelectBox'

const ManageStatus = () => {
    return (
        <Dialog >
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className='bg-white text-black hover:bg-gray-400'>Manage user+</Button>
                </DialogTrigger>
                <DialogContent className=" w-[800px] bg-gray-900 border border-gray-500 text-white ">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Block/Active User</DialogTitle>
                        <DialogDescription>
                            Block User Or Active User
                        </DialogDescription>
                    </DialogHeader>
                    <form action="">
                        <div className="grid gap-4">
                            <div className="grid gap-3  text-xl">
                                <Label htmlFor="name-1">ClassName</Label>
                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" className='border border-gray-500' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="classTime-1">Class Time</Label>
                                <Input id='classTime-1' name='classTime' type='time' defaultValue='10:30' className='w-[20%] border border-gray-500 ' />
                                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Select Trainer</Label>
                                {/* <ComboboxDemo /> */}
                                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        {/* <DialogClose asChild>
                            <Button variant="outline" className='text-black' >Cancel</Button>
                        </DialogClose> */}
                        <Button type="submit" className='bg-white text-black hover:bg-gray-400'>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>


    )
}

export default ManageStatus