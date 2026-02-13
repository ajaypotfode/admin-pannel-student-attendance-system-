
import AdminTokenForm from "@/components/AdminTokenForm"
import SignUpForm from "@/components/SignUpForm"
import UseAuth from "@/hooks/useAuth"

const Signup = () => {
    const { getUserRegister, imageRef, getAdminTokenVerify, verifyAdminToken, handleImageUpload, loading } = UseAuth()


    return (
        <div className="min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% w-full overflow-hidden">
            {
                !verifyAdminToken ?
                    (<AdminTokenForm onSubmit={getAdminTokenVerify} />)
                    :
                    (<div className="pt-5 px-5 h-screen flex">
                        <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-hidden flex flex-col justify-center items-center">
                            <div className="max-w-lg h-[90vh]  w-full">
                                <SignUpForm
                                    imageLoading={loading['uploadImage']}
                                    submitLoading={loading['signupUser']}
                                    onSubmit={getUserRegister}
                                    role={'admin'}
                                    imageRef={imageRef}
                                    token={verifyAdminToken}
                                    handleImageUpload={handleImageUpload}
                                />
                            </div>
                        </div>
                    </div>)
            }
        </div>

    )
}

export default Signup