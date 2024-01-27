import { Box, Skeleton } from "@mantine/core"

type TableLoaderProps = {
    skeletonCount: number
}
const TableLoader = ({ skeletonCount }: TableLoaderProps) => (
    <Box data-testid='table-loader'>
        <Skeleton data-testid="skeleton" height={20} mt={200} radius="xl" />
        {new Array(skeletonCount).fill(null).map((_, idx) => <Skeleton key={idx} height={20} mt={10} radius="xl" />)}
    </Box>
)

export default TableLoader