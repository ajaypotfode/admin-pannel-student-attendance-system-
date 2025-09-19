import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    // PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    pageNum: number,
    totalPage: number,
    getNextPage({ pageNum }: { pageNum?: number }): void
}

export const PaginationComponent: React.FC<PaginationProps> = ({ pageNum, totalPage, getNextPage }) => {

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {
                        (pageNum >1) && <PaginationPrevious
                            className="bg-transparent border-0 hover:text-gray-500 text-white hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none cursor-pointer"
                            size="sm"
                            onClickCapture={() => getNextPage({ pageNum: pageNum - 1 })}

                        />
                    }
                </PaginationItem>
                <PaginationItem>
                    <span className="text-sm text-muted-foreground">
                        {`${pageNum}/${totalPage}`}
                    </span>
                    {/* <PaginationLink href="#">1</PaginationLink> */}
                </PaginationItem>
                <PaginationItem>

                    {
                        pageNum !== totalPage && <PaginationNext
                            className="bg-transparent border-0 hover:text-gray-500 text-white hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none cursor-pointer"
                            size="sm"
                            onClickCapture={() => getNextPage({ pageNum: pageNum + 1 })}
                        />

                    }
                    {/* <PaginationNext className="bg-transparent border-0 hover:text-gray-500 text-white hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none cursor-pointer">
                        <Button
                            variant="outline"
                            size="sm"
                            // disabled
                            className="bg-transparent border-0 hover:text-gray-500 text-white hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none"
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </PaginationNext> */}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
