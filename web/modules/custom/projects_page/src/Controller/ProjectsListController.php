<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Url;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\projects_page\Service\ProjectTaxonomyService;
use Drupal\projects_page\Service\ProjectListService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProjectsListController extends ControllerBase {

  /** @var \Drupal\project_list\Service\ProjectListService */
  protected $listService;

  /** @var \Drupal\project_list\Service\ProjectTaxonomyService */
  protected $taxonomyService;

  /** @var Drupal\Core\Extension\ModuleHandlerInterface */
  protected $moduleHandler;

  public function __construct(ProjectListService $listService, ProjectTaxonomyService $taxonomyService, ModuleHandlerInterface $moduleHandler) {
    $this->listService = $listService;
    $this->taxonomyService = $taxonomyService;
    $this->moduleHandler = $moduleHandler;
  }

  public static function create(ContainerInterface $container) {
    return new static($container->get('project_list.list'), $container->get('project_list.taxonomy'), $container->get('module_handler'));
  }

  public function page() {
    $page = [];

    // Preload the JSON and include it in the Drupal settings JavaScript object
    $projectsAllRoute = Url::fromRoute('projects_page.projects.all')->toString();

    $preload_json = [
      '#tag' => 'link',
      '#attributes' => [
        'rel' => 'preload',
        'href' => $projectsAllRoute,
        'as' => 'fetch',
        'crossorigin' => '',
      ],
    ];
    $page['#attached']['html_head'][] = [$preload_json, 'preload_json'];
    $page['#attached']['drupalSettings']['projects_page'] = [
      'baseUrl' => '/' . $this->moduleHandler->getModule('projects_page')->getPath() . '/app/',
      'endpoint' => $projectsAllRoute,
      'attributes' => $this->taxonomyService->getAttributes(),
      'sdgs' => $this->taxonomyService->getSustainableDevelopmentGoals(),
    ];

    $page['#attached']['library'][] = 'projects_page/dist';
    $page['#attached']['library'][] = 'core/drupalSettings';

    $page['#markup'] = '<div id="app"></div>';
    $page['#cache']['max-age'] = 31536000;

    return $page;
  }

  public function all() {
    $data = $this->listService->getTeaserData();

    $cacheMetaData = new CacheableMetadata();
    $cacheMetaData->setCacheMaxAge(3600);
    $cacheMetaData->setCacheContexts(['url']);

    $response = new CacheableJsonResponse($data);
    $response->addCacheableDependency($cacheMetaData);
    return $response;
  }

  public function attributes() {
    return new JsonResponse($this->taxonomyService->getAttributes());
  }

  public function sdgs() {
    return new JsonResponse($this->taxonomyService->getSustainableDevelopmentGoals());
  }
}
