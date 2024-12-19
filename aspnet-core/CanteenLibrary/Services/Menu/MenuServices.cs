using CanteenLibrary.AmazonS3;
using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.MenuDto;
using CanteenLibrary.Entities;
using CanteenLibrary.QueryExtension;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CanteenLibrary.Services.Menu
{
    public class MenuServices : IMenuServices
    {
        private readonly BrigadaCanteenContext _context;
        private readonly IS3Services _amazon;

        public MenuServices(BrigadaCanteenContext context, IS3Services Amazon)
        {
            _context = context;
            _amazon = Amazon;
        }

        public async Task<ApiResponseMessage<string>> CreateOrEditMenuCategory(CreateOrEditMenuCategoryDto Dto)
        {
            try
            {

                var apiMessage = "";

                if (Dto.Id == "")
                {
                    var insertCat = new TblMenuItemCategory
                    {
                        Id = Guid.NewGuid(),
                        CategoryName = Dto.CategoryName,
                        IsDeleted = false,
                        CreationTime = DateTime.Now,


                    };

                    await _context.AddAsync(insertCat);
                    apiMessage = "Added";
                }
                else
                {

                    var catExisting = _context.TblMenuItemCategories.FirstOrDefault(x => x.Id == Guid.Parse(Dto.Id!));
                    if (catExisting != null)
                    {
                        catExisting.CategoryName = Dto.CategoryName;
                        catExisting.ModifiedTime = DateTime.Now;
                        apiMessage = "Update";
                    }
                    else 
                    {
                        apiMessage = "No Data";
                    }


                }

                await _context.SaveChangesAsync();

                return new ApiResponseMessage<string>
                {
                    Data = apiMessage,
                    IsSuccess = true,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<string>
                {
                    Data = "",
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<ApiResponseMessage<string>> CreateOrEditMenuItems(CreateOrEditMenuItemDto Dto)
        {

            try
            {

                var ApiMessage = "";
                var folderPath = "BrigadaCanteenAws";
     
             

                if (Dto.Id is null)
                {


                    using (var stream = Dto.file!.OpenReadStream())
                    {
                        if (Dto.file != null)
                        {
                            var contentType = Dto.file!.ContentType;
                            var fileUrl = await _amazon.UploadFileAsync(stream, Dto.file.FileName, contentType, folderPath);



                            var InsertItem = new TblMenuItem
                            {
                                Id = Guid.NewGuid(),
                                CategoryId = Dto.CategoryId,
                                ItemName = Dto.ItemName,
                                ItemDesc = Dto.ItemDesc,
                                Price = Dto.Price,
                                StockQuantity = Dto.StockQuantity,
                                IsBestSeller = false,
                                ImgUrl = fileUrl,
                                CreationTime = DateTime.Now,

                            };


                            await _context.TblMenuItems.AddAsync(InsertItem);
                            ApiMessage = "Added";
                        }
                        else
                        {
                            ApiMessage = "No Data";
                        }
                    }

                  
                }
                else
                {
                    var existingItem = await _context.TblMenuItems.FirstOrDefaultAsync(x => x.Id == Dto.Id);


                        //if no Image Use the existing ImgUrl
                        if (Dto.file == null) {

                            existingItem!.CategoryId = Dto.CategoryId;
                            existingItem.ItemName = Dto.ItemName;
                            existingItem.ItemDesc = Dto.ItemDesc;
                            existingItem.Price = Dto.Price;
                            existingItem.StockQuantity = Dto.StockQuantity;
                           

                            ApiMessage = "Updated";

                        }
                        else 
                        {
                            //Insert the new Img that the user uploaded
                            using (var stream = Dto.file!.OpenReadStream())
                            {
                                var contentType = Dto.file!.ContentType;
                                var fileUrl = await _amazon.UploadFileAsync(stream, Dto.file.FileName, contentType, folderPath);

                                if (existingItem != null)
                                {
                                    existingItem.CategoryId = Dto.CategoryId;
                                    existingItem.ItemName = Dto.ItemName;
                                    existingItem.ItemDesc = Dto.ItemDesc;
                                    existingItem.Price = Dto.Price;
                                    existingItem.StockQuantity = Dto.StockQuantity;
                                    existingItem.ImgUrl = fileUrl;


                                    ApiMessage = "Updated";
                                }
                                else
                                {
                                    ApiMessage = "No Data";
                                }

                            }
                        }
                }
                
                await _context.SaveChangesAsync();
                return new ApiResponseMessage<string>
                {
                    Data = ApiMessage,
                    IsSuccess = true,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseMessage<string>
                {
                    Data = "",
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<ApiResponseMessage<IList<GetAllOrGetByIdDto>>> GetAllOrGetAllById(Guid? id)
        {
            try
            {
                IList<GetAllOrGetByIdDto> query;

                if (id is null)
                {
                    query = await (from item in _context.TblMenuItems
                                       join category in _context.TblMenuItemCategories on item.CategoryId equals category.Id
                                       select new GetAllOrGetByIdDto
                                       {
                                           Id = item.Id,
                                           CategoryName = category.CategoryName,
                                           ItemName = item.ItemName,
                                           ItemDesc = item.ItemDesc,
                                           Price = item.Price,
                                           StockQuantity = item.StockQuantity,
                                           ImgUrl = item.ImgUrl,


                                       }).ToListAsync();
                }
                else 
                {
                    query = await (from item in _context.TblMenuItems
                                       join category in _context.TblMenuItemCategories on item.CategoryId equals category.Id
                                       where category.Id == id
                                   select new GetAllOrGetByIdDto
                                       {
                                           Id = item.Id,
                                           CategoryName = category.CategoryName,
                                           ItemName = item.ItemName,
                                           ItemDesc = item.ItemDesc,
                                           Price = item.Price,
                                           StockQuantity = item.StockQuantity,
                                           ImgUrl = item.ImgUrl,


                                       }).ToListAsync();
                }



                return new ApiResponseMessage<IList<GetAllOrGetByIdDto>>
                {
                    Data = query,
                    IsSuccess = true,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<IList<GetAllOrGetByIdDto>>
                {
                    Data = [],
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<ApiResponseMessage<IList<GetAllMenuCategoryDto>>> GetAllMenuCategory()
        {
            try
            {

                var getCategory = await _context.TblMenuItemCategories.Select(x => new GetAllMenuCategoryDto
                {
                Id= x.Id,
                CategoryName= x.CategoryName,
                }).ToListAsync();

                return new ApiResponseMessage<IList<GetAllMenuCategoryDto>>
                {
                    Data = getCategory ?? null!,
                    IsSuccess = getCategory is not null ? true : false,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<IList<GetAllMenuCategoryDto>>
                {
                    Data = null!,
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }
        public async Task<ApiResponseMessage<IList<GetAllMenuCategoryDto>>> GetAllMenuCategory1(int pageIndex, int pageSize, string? searchstring)
        {
            try
            {


                IQueryable<TblMenuItemCategory> datares = _context.TblMenuItemCategories;

                var totalRecords = datares.Count();

                var res = await datares.Skip(pageIndex * pageSize)
                    .WhereIf(!string.IsNullOrEmpty(searchstring), x => x.CategoryName.Contains(searchstring!))
                    .Take(pageSize)
                    .Select(x => new GetAllMenuCategoryDto
                    {
                        Id = x.Id,
                        CategoryName = x.CategoryName,
                        TotalRecords = totalRecords
                    })
                    .ToListAsync();



                return new ApiResponseMessage<IList<GetAllMenuCategoryDto>>
                {
                    Data = res ?? new List<GetAllMenuCategoryDto>(),
                    IsSuccess = res != null,
                    ErrorMessage = "",
                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<IList<GetAllMenuCategoryDto>>
                {
                    Data = null!,
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                };
            }
        }
        public async Task<ApiResponseMessage<GetMenuItemByIdDto>> GetMenuItemById(Guid id)
        {
            try
            {

                var getData = await 
                               (
                               from item in _context.TblMenuItems
                               join category in _context.TblMenuItemCategories on item.CategoryId equals category.Id
                               where item.Id == id
                               select new GetMenuItemByIdDto
                               {
                                   Id = item.Id,
                                   CategoryId = category.Id,
                                   CategoryName = category.CategoryName,
                                   ItemName = item.ItemName,
                                   ItemDesc = item.ItemDesc,
                                   Price = item.Price,
                                   StockQuantity = item.StockQuantity,
                                   ImgUrl = item.ImgUrl,


                               }).FirstOrDefaultAsync();

                return new ApiResponseMessage<GetMenuItemByIdDto>
                {
                    Data = getData,
                    IsSuccess = getData is not null ? true : false,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<GetMenuItemByIdDto>
                {
                    Data = null!,
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
