import React from 'react'

export default function ProfileSection(props) {

    const {userForm} = props;
    return (
        <div className="bg-white rounded-b-3xl p-2">
            <form>
                <div className="mb-8 p-2 w-full flex flex-wrap">
                    <div className="w-full px-2 mt-2 flex flex-col  lg:w-1/2" >
                        <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Username</label>
                        <input type="text" value={userForm?.userName} onChange={(e) => handleChange(e.target.value, 'userName')} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
                    </div>
                    {/* <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
                <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Email</label>
                <input type="text" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
              </div> */}
                    <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
                        <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Phone</label>
                        <input type="text" value={userForm?.phone_number} onChange={(e) => handleChange(e.target.value, 'phone_number')} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
                    </div>
                    <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
                        <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Currently You &#39;re ??</label>
                        <select name="" id="" value={userForm?.designation} onChange={(e) => handleChange(e.target.value, 'designation')} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200">
                            <option value="" hidden>Select a Designation ..</option>
                            <option value="student">Student</option>
                            <option value="Professional">Professional</option>
                            <option value="Jobseeker">Jobseeker</option>
                        </select>
                    </div>
                    <div className='w-full flex px-2 mt-2 flex-col'>
                        <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Add Bio</label>
                        <textarea name="" id="" value={userForm?.bio} onChange={(e) => handleChange(e.target.value, 'bio')} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"></textarea>
                    </div>
                    <div className='w-full flex px-2 mt-2 flex-col'>
                        <button type='button' className='w-max px-4 py-2 rounded-md bg-green-500 text-white transition-all hover:bg-green-600' onClick={() => console.log(userForm)}>Update</button>
                    </div>
                </div>
            </form>

        </div>)
}
