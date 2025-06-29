import { Switch, Typography } from "@mui/material"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface SwitchProps<T extends FieldValues> {
    name: Path<T>,
    control: Control<T>,
    label?: string,
    disabled?:boolean;
}

const CustomSwitch = <T extends FieldValues>({ name, control, label, disabled }: SwitchProps<T>) => {
    return (
        <div>
            <Controller name={name} control={control} render={({ field }) => (
                <div className="flex items-center">
                    <Typography>{label}</Typography>
                    <Switch disabled={disabled} {...field} onChange={(newValue) => field.onChange(newValue)}  checked={field.value}/>
                </div>
            )} />
        </div>
    )
}

export default CustomSwitch