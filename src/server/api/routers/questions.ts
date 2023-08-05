import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ surveyId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.question.findMany({
        where: {
          surveyId: input.surveyId,
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

  create: protectedProcedure
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
});
