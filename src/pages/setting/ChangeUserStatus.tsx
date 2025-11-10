import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UseUserData from '@/hooks/useUserData';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Label } from '@radix-ui/react-label';
// import React from 'react'


const ChangeUserStatus = () => {

  const { fetchUser, getChangeUserStatus, getUserData, getUserStatus, user, userData } = UseUserData()

  return (
    <div className="w-full h-full overflow-y-auto p-4 ">
      <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6">Active/Block User </h1>
      {/* <div className=' p-8 w-full border'> */}
      <div className="flex justify-center space-x-6 gap-6 p-5 py-8 w-full ">
        <Card className="flex-1 bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden p-8 ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-x-4 w-full">
              <Input placeholder="Enter user Email " className='w-fit' value={userData || ""} onChange={(e) => getUserData(e.target.value)} />
              {/* <Input placeholder="Enter active/block " className='w-fit' /> */}
              <Button onClick={fetchUser} className='bg-white text-black hover:bg-gray-400  cursor-pointer ' >Get User</Button>
              {/* <ComboboxDemo /> */}
            </div>
          </div>
          <form action="">
            <div className="grid gap-4">
              <div className="grid gap-3  text-xl">
                <Label htmlFor="name-1">UserName</Label>
                <Input id="name-1" name="name" defaultValue={user?.userName || ""} disabled className='border border-gray-500' />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id='email' name='email' type='email' disabled defaultValue={user?.email || ""} className=' border border-gray-500 ' />
                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="contact">Role</Label>
                <Input id='contact' name='contactNo' disabled defaultValue={user?.role || ""} className=' border border-gray-500 ' />
                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
              </div>
              <div className="grid gap-3 w-[40%]">
                <Label htmlFor="username-1">Select Status</Label>
                <SelectInput
                  getValue={getUserStatus}
                  options={
                    [
                      { value: 'active', label: 'Active' },
                      { value: 'block', label: 'Block' }
                    ]

                  }
                  inputValue={user?.status || ""}
                />
                {/* <ComboboxDemo /> */}
                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
              </div>
              <div className='flex justify-between w-full'>
                <Button className='w-fit bg-white text-black hover:bg-gray-400 ' onClick={getChangeUserStatus} >Change Status</Button>
                <p className='text-gray-500'>To Change User Status "Get User" Via "Email"</p>
              </div>

            </div>

          </form>

        </Card>
      </div>
    </div>
  )

}

export default ChangeUserStatus