import SignUpForm from "@/components/SignUpForm"
import UseAuth from "@/hooks/useAuth"
// import { useAppSelector } from '@/redux/reduxHook'


const RegistrationForm = () => {
    // const { loginData } = useAppSelector(state => state.auth)
    const { getUserRegister, imageRef, loading, handleImageUpload } = UseAuth()

    return (
        <div className="min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% w-full overflow-hidden">
            <div className="pt-5 px-5 h-screen flex">
                <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-hidden flex flex-col justify-center items-center">
                    <div className="overflow-hidden max-w-lg h-[90%] w-full">
                        <SignUpForm
                            imageLoading={loading['uploadImage']}
                            submitLoading={loading['studentRegister']}
                            onSubmit={getUserRegister}
                            role={'student'}
                            imageRef={imageRef}
                            handleImageUpload={handleImageUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm