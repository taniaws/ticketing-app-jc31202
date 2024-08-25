import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

interface IDashboard {
    email: string;
  }
  

export class DashboardController {

    //get event list with email
    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const adminEmail = req.params.email;
            const events = await prisma.event.findMany({
                where: {
                    user: {
                        email: adminEmail,
                    }
                },
                include: {
                    location: true,
                    categori: true,
                },
            });

          return res.status(201).send({
              success: true,
              message: "Get event list successful",
              data: events
          })
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to get event list",
                error: error
            })
        }
    };

    //get attendees registration
    async getAttendees(req: Request, res: Response, next: NextFunction) {
        const { email, eventId } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }
        
        try {
            const adminUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    event: true,
                },
            });
    
            if (!adminUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin user not found',
                });
            }
    
            const adminEventIds = adminUser.event.map(event => event.id);

            if (adminEventIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No events found for this admin.",
                    data: [],
                });
            }
            
            const eventFilter = eventId ? { eventId: parseInt(eventId) } : { eventId: { in: adminEventIds } };
    
            const attendees = await prisma.transaction.findMany({
                where: eventFilter,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    event: {
                        select: {
                            id: true,
                            namaEvent: true,
                        },
                    },
                    detailtransaction: {
                        select: {
                            ticketcode: true,
                        },
                    },
                },
            });
    

            return res.status(200).send({
                success: true,
                message: "Get attendee list successful",
                data: attendees,
            });
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to get attendee list",
                error: error
            });
        }
    }

    //get transaction with email
    async getTransaction(req: Request, res: Response, next: NextFunction) {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }
        
        try {
            const adminUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!adminUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin not found',
                });
            }

            const transactions = await prisma.transaction.findMany({
                where: {
                    event: {
                        userId: adminUser.id,
                    },
                },
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    event: {
                        select: {
                            id: true,
                            namaEvent: true,
                        },
                    },
                },
            });

            return res.status(200).json({
                success: true,
                message: "Get transactions list successful",
                data: transactions,
            });
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to get transactions list",
                error: error,
            });
        }
    };

    //STATISTICS - number of registration
    async getRegistrationStatistics(req: Request, res: Response, next: NextFunction) {
        const { email } = req.params;
        const { range } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        if (!range) {
            return res.status(400).json({
                success: false,
                message: 'Time range is required',
            });
        }

        try {
            const adminUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    event: true,
                },
            });

            if (!adminUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin not found',
                });
            }

            const adminEventIds = adminUser.event.map(event => event.id);

            let statistics:any;

            switch (range) {
                case 'day':
                    statistics = await prisma.transaction.groupBy({
                        by: ['createdAt'],
                        where: {
                            eventId: {
                                in: adminEventIds,
                            },
                        },
                        _count: {
                            _all: true,
                        },
                        _sum: {
                            amount: true,
                        },
                        orderBy: {
                            createdAt: 'asc',
                        },
                    });
                    statistics = statistics.map((statistic:any) => ({
                        date: statistic.createdAt.toISOString().split('T')[0],
                        count: statistic._count._all,
                        totalAmount: statistic._sum.amount,
                    }));
                    break;

                case 'month':
                    statistics = await prisma.transaction.findMany({
                        where: {
                            eventId: {
                                in: adminEventIds,
                            },
                        },
                    });
                    statistics = statistics.reduce((acc:any, transaction:any) => {
                        const date = new Date(transaction.createdAt);
                        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
                        if (!acc[key]) {
                            acc[key] = { count: 0, totalAmount: 0 };
                        }
                        acc[key].count += 1;
                        acc[key].totalAmount += transaction.amount;
                        return acc;
                    }, {} as { [key: string]: { count: number, totalAmount: number } });
                    statistics = Object.keys(statistics).map(key => ({
                        date: key,
                        count: statistics[key].count,
                        totalAmount: statistics[key].totalAmount,
                    }));
                    break;

                case 'year':
                    statistics = await prisma.transaction.findMany({
                        where: {
                            eventId: {
                                in: adminEventIds,
                            },
                        },
                    });
                    statistics = statistics.reduce((acc:any, transaction:any) => {
                        const date = new Date(transaction.createdAt);
                        const key = `${date.getFullYear()}`;
                        if (!acc[key]) {
                            acc[key] = { count: 0, totalAmount: 0 };
                        }
                        acc[key].count += 1;
                        acc[key].totalAmount += transaction.amount;
                        return acc;
                    }, {} as { [key: string]: { count: number, totalAmount: number } });
                    statistics = Object.keys(statistics).map(key => ({
                        date: key,
                        count: statistics[key].count,
                        totalAmount: statistics[key].totalAmount,
                    }));
                    break;
                
                default:
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid time range.',
                    });
            }

            return res.status(200).json({
                success: true,
                message: "Get registration statistics successful",
                data: statistics,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve registration statistic",
                error: error,
            });
        }
    };

    
};