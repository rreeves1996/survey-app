import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.answer.findMany({
        where: {
          questionId: input.questionId,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        answer: z.string(),
        questionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.answer.create({
        data: {
          answer: input.answer,
          questionId: input.questionId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.answer.delete({ where: { id: input.id } });
    }),
});
