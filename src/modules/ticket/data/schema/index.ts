import { Schema, model } from 'mongoose';
import { TicketPriority, TicketStatus } from '../../entity';

const TicketSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: [TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.CLOSED]
        },
        priority: {
            type: String,
            enum: [TicketPriority.LOW, TicketPriority.MEDIUM, TicketPriority.HIGH]
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

TicketSchema.index({ title: 1, description: 1, status: 1, priority: -1 });

export const Ticket = model('ticket', TicketSchema);
