using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Coffies
{
    public class Details
    {
        public class Query : IRequest<Coffee>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Coffee>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Coffee> Handle(Query request, CancellationToken cancellationToken)
            {
                var coffee = await _context.Coffee.FindAsync(request.Id);

                return coffee;
            }
        }
    }
}