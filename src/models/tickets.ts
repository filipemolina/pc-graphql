import { ContextType } from '@src/api';
import { ApiTicket, Ticket } from '@src/types';

const TicketsModel = {
  getTicketsByDocumentVersionId: async (
    { dataSources: { Tickets } }: ContextType,
    docId: string
  ) => {
    const results = ((await Tickets.byDocumentVersionId(
      docId
    )) as unknown) as ApiTicket[];

    const convertedResults = results.map((result) => {
      const basePrice = result.PassAlongFees
        ? result.SchoolCollects || 0
        : result.ParentPays || 0;

      return {
        ...result,
        MaximumQuantity: result.MaximumAmountPerOrder,
        MinimumQuantity: result.MinimumAmountPerOrder,
        Price: basePrice,
        Inventory: {
          ...result.Inventory,
          Quantity: result.Inventory.Quantity * -1,
        },
      };
    });

    return (convertedResults as unknown) as Ticket[];
  },
};

export { TicketsModel };
