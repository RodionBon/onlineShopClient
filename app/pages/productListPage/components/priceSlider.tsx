import { Box, InputAdornment, Slider, Stack, TextField, Typography } from "@mui/material"
import { NumericFormat } from 'react-number-format';

export default function PriceSlider({ value, maxValue, onChange }: { value: number[], maxValue: number, onChange: (newValue: number[]) => void }) {
    return (
        <Stack gap={1}>
            <Box sx={{ display: 'flex', alignItems: "baseline", gap: 1 }}>
                <NumericFormat
                    customInput={TextField}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    value={value[0]}
                    slotProps={{
                        input: { endAdornment: <InputAdornment position="end">€</InputAdornment> }
                    }}
                    onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue >= 0)
                            onChange([newValue, value[1]])
                    }}
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        return floatValue === undefined || (floatValue >= 0 && floatValue <= maxValue);
                    }}
                />
                <Typography>-</Typography>
                <NumericFormat
                    customInput={TextField}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    value={value[1]}
                    slotProps={{
                        input: { endAdornment: <InputAdornment position="end">€</InputAdornment> }
                    }}
                    onChange={(e) => onChange([value[0], Number(e.target.value)])}
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        return floatValue === undefined || (floatValue >= 0 && floatValue <= maxValue);
                    }}
                />
            </Box>
            <Slider value={value} max={maxValue} onChange={(e, newValue) => onChange(newValue)} />
        </Stack>
    )
}
