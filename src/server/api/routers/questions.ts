import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ surveyId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.question.findMany({
        where: {
          surveyId: input.surveyId,
        },
        include: {
          answers: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        questionType: z.string(),
        questionBody: z.string(),
        surveyId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.question.update({
        data: {
          questionType: input.questionType,
          questionBody: input.questionBody,
          surveyId: input.surveyId,
        },
        where: {
          id: input.questionId,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        questionType: z.string(),
        questionBody: z.string(),
        surveyId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          questionType: input.questionType,
          questionBody: input.questionBody,
          surveyId: input.surveyId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.question.delete({ where: { id: input.id } });
    }),
});
