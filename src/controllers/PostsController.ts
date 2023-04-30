import { Router, Request, Response } from 'express'
import { Post, PostBase } from '../models/Post'

export const PostsController = Router()

PostsController.get(
  '/',
  (req: Request<{}, {}, {}, PageOptions>, res: Response) =>
    Post.getPage(req.params)
      .then((posts) => res.json(posts))
      .catch((_) => res.status(500).send())
)

PostsController.post('/', (req: Request<{}, {}, PostBase>, res: Response) =>
  Post.create(req.body)
    .then((post) => res.status(201).json(post))
    .catch((_) => res.status(500).send())
)

PostsController.delete('/:id', (req: Request<{ id: number }>, res: Response) =>
  Post.delete(req.params.id)
    .then(() => res.send())
    .catch((_) => res.status(500).send())
)

PostsController.get('/:id', (req: Request<{ id: number }>, res: Response) =>
  Post.find(req.params.id)
    .then((post) => res.json(post))
    .catch((_) => res.status(404).send())
)

PostsController.put(
  '/:id',
  (req: Request<{ id: number }, {}, Partial<PostBase>>, res: Response) =>
    Post.update(req.params.id, req.body)
      .then((post) => res.status(201).json(post))
      .catch((_) => {
        console.log(_)

        res.status(500).send()
      })
)
