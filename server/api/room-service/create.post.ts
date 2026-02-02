import { not } from 'drizzle-orm'
import { json } from 'node:stream/consumers'
import { it } from 'node:test'
import { orders } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event)
        const { location, roomId, guestId, items, notes} = body

        if (!location || !items || items.length) {
            throw createError({
                statusCode: 400,
                statusMessage: 'missing requreid fields'
            })
        }

        // calcute tottal
        const subtotal = items.reduce((sum: number, item: any) => {
            return sum + (parseFloat(item.price) * item.quantity)
        }, 0)
        const moms = 0.15
        const tax = subtotal * moms
        const total = subtotal + tax

        // create room serverice order
        const newOrder = await db.insert(orders).values({
            type: 'room-service',
            location,
            roomId: roomId || null,
            guestId: guestId || null,
            status: 'pending',
            items: JSON.stringify(items),
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            notes: notes || null
        }).returning()

        return{
            success: true,
            data: newOrder[0]
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'feil til å bestille room service order'
        })
    }
})