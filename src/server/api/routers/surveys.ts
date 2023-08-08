import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.survey.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        questions: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ surveyId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.survey.findUnique({
        where: {
          id: input.surveyId,
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({ surveyId: z.string(), name: z.string(), active: z.boolean() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.survey.update({
        data: {
          name: input.name,
          active: input.active,
        },
        where: {
          id: input.surveyId,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.survey.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.survey.delete({ where: { id: input.id } });
    }),
});
