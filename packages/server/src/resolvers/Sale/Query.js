const pageInfo = {
    endCursor: "CURSOR NÃO ARRUMADO",
    hasNextPage: true
}


const sales = async (_, args) => {
    try {
        const current = "CURSOR NÃO ARRUMADO";
        const listSales = await connection('sale');

        return {
            pageInfo,
            edges: listSales.map(item => ({ node: item, cursor: current })),
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const sale = async (_, args) => {
    try {
        const data = await connection('sale')
            .where('id', args.id)
            .first();

        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    sales,
    sale
};