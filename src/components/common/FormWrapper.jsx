import React from "react";

const FormWrapper = (props) => {
    return (
        <div className="flex flex-col min-h-screen min-w-screen bg-secondary">
            <div className="container flex flex-1 flex-col items-center justify-center max-w-sm mx-auto px-2">
                <form className="rounded shadow-md w-full text-black bg-white px-6 py-8">
                    {props.formContent}
                </form>
                {
                    props.formFooter && (
                        <div className="mt-6">
                            {props.formFooter}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FormWrapper;