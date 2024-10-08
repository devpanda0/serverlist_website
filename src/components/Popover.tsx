import {useDisclosure} from '@mantine/hooks';
import {Popover, Text, Box} from '@mantine/core';
import {ReactNode} from "react";

export default function CustomPopover({text, brText, children}: { text?: string | ReactNode, brText?: string, children?: ReactNode }) {
    const [opened, {close, open}] = useDisclosure(false);
    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
            <Popover.Target>
                <Box
                    onMouseEnter={() => {if (brText) open();}}
                    onMouseLeave={close}
                >
                    {text ?? children}
                </Box>
            </Popover.Target>
            <Popover.Dropdown style={{pointerEvents: 'none'}}>
                <Text size="sm">{brText}</Text>
            </Popover.Dropdown>
        </Popover>
    );
}