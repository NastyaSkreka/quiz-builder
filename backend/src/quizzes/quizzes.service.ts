import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto, QuestionType } from './dto/create-quiz.dto';
;

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    for (const q of dto.questions) {
      if (q.type === QuestionType.MULTIPLE_CHOICE) {
        if (!q.options?.length) throw new BadRequestException('Multiple choice needs options');
        const correctCount = q.options.filter(o => o.isCorrect).length;
        if (correctCount < 1) throw new BadRequestException('Multiple choice needs at least one correct option');
      }
      if (q.type === QuestionType.TRUE_FALSE && typeof q.correctBoolean !== 'boolean') {
        throw new BadRequestException('TRUE_FALSE needs correctBoolean');
      }
      if (q.type === QuestionType.SHORT_ANSWER && !q.correctText?.trim()) {
        throw new BadRequestException('SHORT_ANSWER needs correctText');
      }
    }

    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        description: dto.description,
        questions: {
          create: dto.questions.map((q) => ({
            type: q.type as any,
            prompt: q.prompt,
            order: q.order,
            correctBoolean: q.type === QuestionType.TRUE_FALSE ? q.correctBoolean : null,
            correctText: q.type === QuestionType.SHORT_ANSWER ? q.correctText : null,
            options: q.type === QuestionType.MULTIPLE_CHOICE
              ? { create: q.options!.map(o => ({ text: o.text, isCorrect: !!o.isCorrect })) }
              : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
    });
  }

  async list() {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: { select: { questions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return quizzes.map(q => ({
      id: q.id,
      title: q.title,
      createdAt: q.createdAt,
      questionCount: q._count.questions,
    }));
  }

  async getById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: { include: { options: true }, orderBy: { order: 'asc' } },
      },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prisma.quiz.delete({ where: { id } });
    return { ok: true };
  }
}

