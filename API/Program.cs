using API.Extensions;
using API.Interfaces;
using API.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityService(builder.Configuration);


builder.Services.AddScoped<ITokenService,TokenService>();


var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseCors(x =>
{
    x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200");
});

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

app.Run();
