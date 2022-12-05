import {ChangeEvent, useState} from "react";
import {IUnifyFormData} from "../services/slices/form/types";

export function useForm(inputValues: IUnifyFormData ) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}