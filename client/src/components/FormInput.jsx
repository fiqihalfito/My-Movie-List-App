const FormInput = ({ type, name, handleChange, error }) => {
    return (
        <div className="mb-6">
            <div className=" relative border-2 border-indigo-700 rounded-full outline-none ">
                <input
                    type={type}
                    id={name}
                    name={name}
                    className="peer/email px-4 py-4 w-full outline-none placeholder-transparent rounded-xl text-black font-bold"
                    placeholder="this email placeholder is transparent"
                    onChange={handleChange} />

                <label htmlFor={name} className="font-bold capitalize text-slate-400 text-base rounded-full absolute top-0 left-0 -translate-y-1/2 ml-7 px-3 bg-white transition-all peer-placeholder-shown/email:top-1/2 peer-placeholder-shown/email:ml-5 peer-placeholder-shown/email:text-xl peer-focus/email:top-0 peer-focus/email:ml-3 peer-focus/email:text-base ">
                    {name}
                </label>

            </div>
            <p className="mt-2 ml-4 text-xs font-bold italic text-red-500">{error}</p>
        </div>

    )
}

export default FormInput